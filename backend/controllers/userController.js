const axios = require('axios');
const queryString = require('query-string');
const util = require('../lib/utils');

const Token = require('../models/token');
const User = require('../models/user');

const Role = require('../lib/role');
const RegistrationStatus = require('../lib/registrationStatus');

const linkedinAuth = axios.create({
  baseURL: 'https://www.linkedin.com/',
});

const linkedinApi = axios.create({
  baseURL: 'https://api.linkedin.com/',
});

const getLinkedInProfile = (authCode) =>
  new Promise((resolve, reject) => {
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
    // const emailUrl = 'v2/emailAddress?q=members&projection=(elements*(handle~))'
    // const profilePicUrl = 'v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'

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
            const result = {
              firstName: profileResponse.data.localizedFirstName,
              lastName: profileResponse.data.localizedLastName,
              linkedInId: profileResponse.data.id,
            };

            console.log(profileResponse);

            resolve(result);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(new Error({ msg: 'Error in get linkedin profile' }));
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
      User.findOne({ linkedInId: linkedInProfile.linkedInId }).then((user) => {
        if (user) {
          Token.findOne({ userId: user._id })
            .then((token) => {
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
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                success: false,
                error: 'Error in find token',
              });
            });
        } else {
          return res.status(200).json({
            success: false,
            message: 'User does not exist',
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Unable to process the request',
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

        if (userObj.userType == 'mentee') {
          userObj.role = Role.mentor;
        } else if (userObj.userType == 'mentee') {
          userObj.role = Role.mentee;
        } else {
          userObj.role = Role.mentee; // assign mentee by default during registration
        }

        userObj.save().then((updatedUser) => {
          Token.findOne({ userId: updatedUser._id }).then((token) => {
            // if token isn't in our DB, store
            if (!token) {
              // encrypt information
              const t = util.refreshToken(updatedUser._id);

              Token.create({ refreshToken: t, userId: updatedUser._id });
            }
            // send the access token
            const accessToken = util.accessToken(updatedUser._id);

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
                    _id: updatedUser._id,
                  },
                })
            );
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Unable to process the request',
      });
    });
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

  if (req.body.register) {
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

module.exports = {
  loginUser,
  registerUser,
  tempAuth,
  updateUser,
  userInfo,
};
