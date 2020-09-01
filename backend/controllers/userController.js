const _ = require('lodash');
const axios = require('axios');
const queryString = require('query-string');
const util = require('../lib/utils');

const Match = require('../models/match');
const Token = require('../models/token');
const User = require('../models/user');

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

    linkedinAuth
      .post(authUrl) // exchange auth code for access token
      .then((response) => {
        linkedinApi
          .get(profileUrl, {
            // get user profile
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          })
          .then((profileResponse) => {
            console.log('profile response');
            console.log(profileResponse.data);
            const result = {
              firstName: profileResponse.data.localizedFirstName,
              lastName: profileResponse.data.localizedLastName,
              linkedInId: profileResponse.data.id,
            };

            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(new Error({ msg: 'Error in get linkedin profile' }));
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error({ msg: 'Error in get linkedin profile' }));
      });
  });

const registerUser = (req, res) => {
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

  if (!body.authCode) {
    return res
      .status(400)
      .json({ success: false, error: 'authCode missing in the body' });
  }

  getLinkedInProfile(body.authCode)
    .then((linkedInProfile) => {
      User.findOne({ linkedInId: linkedInProfile.linkedInId }).then((user) => {
        let userObj = user;
        if (user) {
          userObj = Object.assign(user, linkedInProfile);
        } else {
          userObj = new User(linkedInProfile);
        }
        console.log(userObj);
        userObj
          .save()
          .then((updatedUser) => {
            Token.findOne({ userId: updatedUser._id })
              .then((token) => {
                // if token isn't in our DB, store
                if (!token) {
                  // encrypt information
                  const t = util.refreshToken(updatedUser._id);

                  Token.create({ refreshToken: t, userId: updatedUser._id });
                }
                // send the access token
                const accessToken = util.accessToken(updatedUser._id);

                return res
                  .cookie('accessToken', accessToken)
                  .json({ success: true, _id: updatedUser._id });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  error: 'Error in find token',
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  error: 'Error in save user',
                });
              });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              success: false,
              error: 'Unable to authenticate linkedIn profile',
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Unable to authenticate linkedIn profile',
      });
    });
};

const updateUser = (req, res) => {
  console.log('Got update user request');
  const { _id } = req.params;

  if (req.user._id == _id) {
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

    User.findByIdAndUpdate(_id, body.user, { new: true }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'user not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'User Updated',
        user,
      });
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

const userInfo = (req, res) => {
  console.log('Got user info request');
  const { _id } = req.params;

  if (req.user._id == _id) {
    if (!_id) {
      return res.status(400).json({ success: false, error: 'id not sent' });
    }

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

      return res.status(200).json({
        success: true,
        user,
      });
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

const matches = (req, res) => {
  console.log('Got user matches request');
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ success: false, error: '_id not sent' });
  }

  if (req.user._id == _id) {
    User.findByIdAndUpdate(_id).exec((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'user not found' });
      }

      const { userType } = user;

      const findQuery = {};

      if (user.userType === 'mentee') {
        findQuery.menteeId = _id;
      } else if (user.userType === 'mentor') {
        findQuery.mentorId = _id;
      } else {
        return res
          .status(404)
          .json({ success: false, error: 'user type in invalid' });
      }

      Match.find(findQuery)
        .populate('mentorId')
        .populate('menteeId')
        .exec((matchErr, matchesList) => {
          if (matchErr) {
            console.log(err);
            return res.status(500).json({ success: false, error: matchErr });
          }

          const result = { pending: [], active: [], closed: [] };

          _.forEach(matchesList, (match) => {
            switch (userType) {
              case 'mentor':
                result[match.status].push(match.menteeId);
                break;
              case 'mentee':
                result[match.status].push(match.mentorId);
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
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

module.exports = {
  registerUser,
  updateUser,
  userInfo,
  matches,
};
