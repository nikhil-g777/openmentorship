const _ = require('lodash');
const axios = require('axios');
const queryString = require('query-string');
const util = require('../lib/utils');

const { generateTwilioToken } = require('../config/twilio');

const Match = require('../models/match');
const Token = require('../models/token');
const User = require('../models/user');

const RegistrationStatus = require('../lib/registrationStatus');

const linkedinAuth = axios.create({
  baseURL: 'https://www.linkedin.com/',
});

const linkedinApi = axios.create({
  baseURL: 'https://api.linkedin.com/',
});

const getLinkedInProfile = (authCode) =>
  new Promise((resolve, reject) => {
    console.log('get linkedin profile');
    const authUrl = queryString.stringifyUrl({
      url: '/oauth/v2/accessToken',
      query: {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      },
    });
    const profileUrl = '/v2/me';
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
        console.log('profile response');
        console.log(JSON.stringify(profileResponse.data), null, 4);
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
        };
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(new Error({ msg: 'Error in getLinkedInProfile }))' }));
      });
  });

const loginUser = (req, res) => {
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

  getLinkedInProfile(body.authCode)
    .then((linkedInProfile) => {
      return User.findOne({ linkedInId: linkedInProfile.linkedInId });
    })
    .then((user) => {
      if (user) {
        Token.findOne({ userId: user._id }).then((token) => {
          // if token isn't in our DB, store
          if (!token) {
            // encrypt information
            const t = util.refreshToken(user._id);
            Token.create({ refreshToken: t, userId: user._id });
          }
          // send the access token
          const accessToken = util.accessToken(user._id);

          return (
            res
              // .cookie('accessToken', accessToken, {
              //   sameSite: 'none',
              //   secure: true,
              // })
              .json({
                success: true,
                message: 'Login Successful',
                token: accessToken,
                user: {
                  _id: user._id,
                  userType: user.userType,
                },
              })
          );
        });
      } else {
        return res.status(200).json({
          success: false,
          message: 'User does not exist',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Unable to query database',
      });
    });
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
    getLinkedInProfile(body.authCode)
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
        userObj.headline = body.headline;
        userObj.bio = body.bio;
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
          error: 'Error in registering he user',
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

const updateUser = (req, res) => {
  const { _id } = req.user._id;
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

  // eslint-disable-next-line no-unused-vars
  const { role, registrationStatus, ...userObj } = req.body.user; // making sure role and registrationStatus are not updated by the request, for security

  if (req.body.type == 'completeRegistration') {
    // if final step of the registration process
    if (userObj.userType == 'mentee') {
      userObj.registrationStatus = RegistrationStatus.complete;
    } else if (userObj.userType == 'mentor') {
      userObj.registrationStatus = RegistrationStatus.pendingApproval;
    } else {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid User Type' });
    }
  } else if (req.body.type == 'updateUser') {
    console.log('updateUser');
  } else {
    return res.status(400).json({ success: false, error: 'Invalid type' });
  }

  User.findByIdAndUpdate(_id, userObj, { new: true }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: 'user not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User Updated',
      user,
    });
  });
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

module.exports = {
  loginUser,
  registerUser,
  tempAuth,
  updateUser,
  userInfo,
  matches,
  twilioToken,
};
