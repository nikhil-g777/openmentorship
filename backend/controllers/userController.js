const _ = require('lodash');
const util = require('../lib/utils');
const config = require('../config/config');

const { generateTwilioToken } = require('../config/twilio');
const { sendMail } = require('../lib/mailer');
const constants = require('../lib/constants');

const Match = require('../models/match');
const User = require('../models/user');
const {
  handleUserRegistration,
  getLinkedInProfile,
  fetchUserToken,
} = require('../helpers/user');

const sendRegistrationMail = async (user) => {
  const confirmationToken = util.encodeRegistrationToken(user._id);
  const confirmationLink = `https://${process.env.FRONTEND_BASE_URL}/confirmUserRegistration?confirmationToken=${confirmationToken}`;

  let sendgridTemplate = '';
  if (user.userType == constants.userTypes.mentee) {
    sendgridTemplate = config.sendgrid.templates.mentee_signup;
  } else if (user.userType == constants.userTypes.mentor) {
    sendgridTemplate = config.sendgrid.templates.mentor_signup;
  } else {
    // TODO: Add some email alerting for errors like this.
    console.err('Invalid user type for sending registration mail');
  }

  const response = await sendMail(
    user.email,
    'Openmentorship Email Confirmation',
    {
      name: `${user.firstName} ${user.lastName}`,
      confirmationLink,
    },
    sendgridTemplate,
  );
  return response;
};

const loginUser = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  if (!body.authCode) {
    return res
      .status(400)
      .json({ success: false, error: 'authCode missing in the body' });
  }

  try {
    // Adding this flag to enable login from local env ( due to different redirect URI )
    const isLocal = body.isLocal == true;

    const linkedInProfile = await getLinkedInProfile(body.authCode, isLocal);

    // Update LinkedIn profile image URLs for the user
    const updatedUser = await User.findOneAndUpdate(
      { linkedInId: linkedInProfile.linkedInId },
      { profileImageUrls: linkedInProfile.profileImageUrls },
      { new: true },
    ).exec();

    // Handle registration if user is not found or registration is incomplete
    if (
      !updatedUser ||
      updatedUser.registrationStatus === constants.registrationStatus.incomplete
    ) {
      const newRequest = req;
      newRequest.body.type = 'linkedInSignup';
      return await handleUserRegistration(newRequest, res, linkedInProfile);
    }

    if (
      updatedUser.registrationStatus == constants.registrationStatus.complete
    ) {
      const { token } = await fetchUserToken(updatedUser);
      return res.json({
        success: true,
        message: 'Login Successful',
        token,
        user: {
          _id: updatedUser._id,
          userType: updatedUser.userType,
        },
      });
    }
    // If status is not complete
    return res.status(401).json({
      success: false,
      error: constants.loginMessageByStatus[updatedUser.registrationStatus],
      registrationStatus: updatedUser.registrationStatus,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Unable to login user',
    });
  }
};

const tempAuth = (req, res) => {
  console.log('Got temp auth user request');

  const { _id } = req.params;

  if (process.env.NODE_ENV == 'dev') {
    User.findById(_id, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'user not found' });
      }
      // send the access token
      const accessToken = util.accessToken(_id);

      return res
        .cookie('accessToken', accessToken, {
          sameSite: 'none',
          secure: true,
        })
        .json({
          success: true,
          message: 'Login Successful',
          token: accessToken,
          user: {
            _id,
            userType: user.userType,
          },
        });
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

const updateUser = async (req, res) => {
  const { _id } = req.user._id;
  const userRecord = req.user;
  const { body } = req;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  if (!body.user) {
    return res.status(400).json({
      success: false,
      error: 'request body does not have user object',
    });
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const { role, registrationStatus, userType, ...userObj } = req.body.user; // making sure role,  registrationStatus and userType are not updated by the request, for security.
    // For now, changing user type is not allowed.

    if (req.body.type == 'completeRegistration') {
      // if final step of the registration process
      userObj.registrationStatus =
        constants.registrationStatus.pendingConfirmation;
      if (userType) {
        userObj.role = userType;
      }
      sendRegistrationMail(userRecord);
    } else if (req.body.type == 'updateUser') {
      console.log('updateUser');
    } else {
      return res.status(400).json({ success: false, error: 'Invalid type' });
    }

    const user = await User.findByIdAndUpdate(_id, userObj, {
      new: true,
    }).exec();
    if (!user) {
      return res.status(404).json({ success: false, error: 'user not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User Updated',
      user,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: 'unable to update user' });
  }
};

const userInfo = (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    return res.status(400).json({ success: false, error: 'id not sent' });
  }

  User.findById(_id, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: 'user not found' });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  });
};

const matches = (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    return res.status(400).json({ success: false, error: '_id not sent' });
  }

  User.findById(_id).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: 'user not found' });
    }

    const { userType } = user;

    const findQuery = {};

    if (user.userType === 'mentee') {
      findQuery.mentee = _id;
    } else if (user.userType === 'mentor') {
      findQuery.mentor = _id;
    } else {
      return res
        .status(404)
        .json({ success: false, error: 'user type in invalid' });
    }

    Match.find(findQuery)
      .populate('mentor')
      .populate('mentee')
      .populate('latestSession')
      .exec((matchErr, matchesList) => {
        if (matchErr) {
          console.log(err);
          return res.status(500).json({ success: false, error: matchErr });
        }

        const result = { pending: [], active: [], closed: [] };

        _.forEach(matchesList, (match) => {
          switch (userType) {
            case 'mentor':
              result[match.status].push(match);
              break;
            case 'mentee':
              result[match.status].push(match);
              break;
            default:
              console.log('Invalid user type');
          }
        });

        return res.status(200).json({
          success: true,
          matches: result,
        });
      });
  });
};

// Created when there is a request from a mentee
const twilioToken = (req, res) => {
  // inputs : menteeId, mentorId
  const { _id } = req.user;
  const token = generateTwilioToken(_id);
  return res.json({
    success: true,
    twilioToken: token,
  });
};

const confirmRegistration = async (req, res) => {
  const { confirmationToken } = req.query;

  if (!confirmationToken) {
    return res
      .status(400)
      .json({ success: false, err: 'Missing confirmation token' });
  }

  try {
    const tokenResponse = util.decodeRegistrationToken(confirmationToken);

    if (!tokenResponse.success) {
      return res.status(400).json({ success: false, err: 'Invalid Token' });
    }

    const { userId } = tokenResponse;

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(400).json({ success: false, err: 'Invalid User' });
    }

    let newRegistrationStatus = null;
    if (user.userType == constants.userTypes.mentee) {
      newRegistrationStatus = constants.registrationStatus.complete;
    } else if (user.userType == constants.userTypes.mentor) {
      newRegistrationStatus = constants.registrationStatus.pendingApproval;
    } else {
      res.status(500).json({ success: false, err: 'Invalid user type' });
    }

    await User.findByIdAndUpdate(userId, {
      registrationStatus: newRegistrationStatus,
    }).exec();

    return res.json({ success: true, msg: 'Registration Confirmed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json('Unable to confirm User Registration');
  }
};

module.exports = {
  loginUser,
  tempAuth,
  updateUser,
  userInfo,
  matches,
  twilioToken,
  confirmRegistration,
};
