const _ = require('lodash');
const axios = require('axios');
const queryString = require('query-string');
const util = require('../lib/utils');
const config = require('../config/config');

const { generateTwilioToken } = require('../config/twilio');
const { sendMail } = require('../lib/mailer');
const constants = require('../lib/constants');

const Match = require('../models/match');
const Token = require('../models/token');
const User = require('../models/user');

const linkedinAuth = axios.create({
  baseURL: 'https://www.linkedin.com/',
});

const linkedinApi = axios.create({
  baseURL: 'https://api.linkedin.com/',
});

const extractImageUrls = (profileResponse) => {
  const displayImages =
    profileResponse.data.profilePicture['displayImage~'].elements;
  const res = {};

  displayImages.forEach((element) => {
    const { displaySize } = element.data[
      'com.linkedin.digitalmedia.mediaartifact.StillImage'
    ];
    const imageKey = `${displaySize.width}x${displaySize.height}`;
    const imageUrl = element.identifiers[0].identifier;

    res[imageKey] = imageUrl;

    if (imageKey == '200x200') {
      res.default = imageUrl;
    }
  });
  return res;
};

const fetchUserToken = async (user) => {
  const token = await Token.findOne({ userId: user._id });
  if (!token) {
    // encrypt information
    const t = util.refreshToken(user._id);
    Token.create({ refreshToken: t, userId: user._id });
  }
  // send the access token
  const accessToken = util.accessToken(user._id);

  return {
    token: accessToken,
  };
};

const sendRegistrationMail = async (user) => {
  const confirmationToken = util.encodeRegistrationToken(user._id);
  const confirmationLink = `https://${process.env.BASE_URL}:${process.env.APP_PORT}/users/confirmRegistration?confirmationToken=${confirmationToken}`;
  const response = await sendMail(
    user.email,
    'Openmentorship Email Confirmation',
    {
      name: `${user.firstName} ${user.lastName}`,
      confirmationLink,
    },
    config.sendgrid.templates.registration,
  );
  return response;
};

const getLinkedInProfile = (authCode, isLocal = false) =>
  new Promise((resolve, reject) => {
    let redirectUri = '';
    if (isLocal) {
      redirectUri = process.env.LINKEDIN_REDIRECT_URI_LOCAL;
    } else {
      redirectUri = process.env.LINKEDIN_REDIRECT_URI;
    }

    const authUrl = queryString.stringifyUrl({
      url: '/oauth/v2/accessToken',
      query: {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectUri,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      },
    });
    const profileUrl =
      '/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))';
    const emaileUrl = `/v2/emailAddress?q=members&projection=(elements*(handle~))`;

    const results = {};

    linkedinAuth
      .post(authUrl) // exchange auth code for access token
      .then((response) => {
        results.access_token = response.data.access_token;
        return linkedinApi.get(profileUrl, {
          // get user profile
          headers: {
            Authorization: `Bearer ${results.access_token}`,
          },
        });
      })
      .then((profileResponse) => {
        results.profileResponse = profileResponse;
        results.profileImageUrls = extractImageUrls(profileResponse);
        return linkedinApi.get(emaileUrl, {
          headers: {
            Authorization: `Bearer ${results.access_token}`,
          },
        });
      })
      .then((emailResponse) => {
        const response = {
          firstName: results.profileResponse.data.localizedFirstName,
          lastName: results.profileResponse.data.localizedLastName,
          linkedInId: results.profileResponse.data.id,
          email: emailResponse.data.elements[0]['handle~'].emailAddress,
          profileImageUrls: results.profileImageUrls,
        };
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(new Error({ msg: 'Error in getLinkedInProfile }))' }));
      });
  });

const loginUser = async (req, res) => {
  const { body } = req;

  console.log('Login');

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
    const updateData = { profileImageUrls: linkedInProfile.profileImageUrls };
    const updatedUser = await User.findOneAndUpdate(
      { linkedInId: linkedInProfile.linkedInId },
      updateData,
      { new: true },
    ).exec();

    if (
      updatedUser.registrationStatus == constants.registrationStatus.complete
    ) {
      const { token } = fetchUserToken(updatedUser);
      return (
        res
          // .cookie('accessToken', accessToken, {
          //   sameSite: 'none',
          //   secure: true,
          // })
          .json({
            success: true,
            message: 'Login Successful',
            token,
            user: {
              _id: updatedUser._id,
              userType: updatedUser.userType,
            },
          })
      );
    }
    // If status is not complete
    return res.status(401).json({
      success: false,
      message: 'Login Failed',
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

const registerUser = (req, res) => {
  const { body } = req;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  if (body.type == 'linkedInSignup') {
    if (!body.authCode) {
      return res
        .status(400)
        .json({ success: false, error: 'authCode missing in the body' });
    }
    const results = {};

    const isLocal = body.isLocal == true;

    getLinkedInProfile(body.authCode, isLocal)
      .then((linkedInProfile) => {
        results.linkedInProfile = linkedInProfile;
        return User.findOne({ linkedInId: linkedInProfile.linkedInId }).exec();
      })
      .then((user) => {
        let userObj = user;
        if (user) {
          userObj = Object.assign(user, results.linkedInProfile);
        } else {
          userObj = new User(results.linkedInProfile);
        }
        userObj.profileImageUrls = results.linkedInProfile.profileImageUrls;
        return userObj.save();
      })
      .then((updatedUser) => {
        results.updatedUser = updatedUser;
        return Token.findOne({ userId: updatedUser._id });
      })
      .then((token) => {
        // if token isn't in our DB, store
        if (!token) {
          // encrypt information
          const t = util.refreshToken(results.updatedUser._id);

          Token.create({
            refreshToken: t,
            userId: results.updatedUser._id,
          });
        }
        // send the access token
        const accessToken = util.accessToken(results.updatedUser._id);

        return (
          res
            // .cookie('accessToken', accessToken, {
            //   sameSite: 'none',
            //   secure: true,
            // })
            .json({
              success: true,
              token: accessToken,
              user: {
                _id: results.updatedUser._id,
                firstName: results.linkedInProfile.firstName,
                lastName: results.linkedInProfile.lastName,
                linkedInId: results.linkedInProfile.linkedInId,
                email: results.linkedInProfile.email,
              },
            })
        );
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          error: 'Error in registering the user',
        });
      });
  } else if (body.type == 'completeRegistration') {
    if (!body.user) {
      return res.status(400).json({
        success: false,
        error: 'request body does not have user object',
      });
    }

    return {};
  } else {
    return res.status(400).json({
      success: false,
      error: 'invalid type',
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
        .json({ success: true, _id });
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
    const { role, registrationStatus, ...userObj } = req.body.user; // making sure role and registrationStatus are not updated by the request, for security

    if (req.body.type == 'completeRegistration') {
      // if final step of the registration process
      userObj.registrationStatus =
        constants.registrationStatus.pendingConfirmation;
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
  registerUser,
  tempAuth,
  updateUser,
  userInfo,
  matches,
  twilioToken,
  confirmRegistration,
};
