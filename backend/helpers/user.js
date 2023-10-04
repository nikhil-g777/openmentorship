require('dotenv').config();
const queryString = require('query-string');
const axios = require('axios');
const User = require('../models/user');
const Token = require('../models/token');
const util = require('../lib/utils');
const constants = require('../lib/constants');

// Handle user registration
const handleUserRegistration = async (req, res, linkedInProfile) => {
  const { body } = req;

  try {
    if (body.type == 'linkedInSignup') {
      if (!body.authCode) {
        return res
          .status(400)
          .json({ success: false, error: 'authCode missing in the body' });
      }

      // Results object to store the results of the registration
      const results = {};
      results.linkedInProfile = linkedInProfile;

      // Check if user already exists
      const user = await User.findOne({
        linkedInId: linkedInProfile.linkedInId,
      }).exec();

      // If user exists, assign linkedInProfile to user or create new user
      let userObj = user;
      if (user) {
        userObj = Object.assign(user, results.linkedInProfile);
      } else {
        userObj = await new User(results.linkedInProfile);
      }

      // Add profile image urls and save user
      userObj.profileImageUrls = results.linkedInProfile.profileImageUrls;
      const updatedUser = await userObj.save();

      // Store the updated user in results and send the access token
      results.updatedUser = updatedUser;
      const token = await Token.findOne({ userId: updatedUser._id });
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
          .status(200)
          .json({
            success: true,
            newUser: true,
            error: constants.loginMessageByStatus.incomplete,
            registrationStatus: constants.registrationStatus.incomplete,
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
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Unable to register user',
    });
  }
};

// Extract image urls from linkedIn profile
const extractImageUrls = (profileResponse) => {
  const res = {};
  if (profileResponse.data.profilePicture) {
    const displayImages =
      profileResponse.data.profilePicture['displayImage~'].elements;

    displayImages.forEach((element) => {
      const { displaySize } =
        element.data['com.linkedin.digitalmedia.mediaartifact.StillImage'];
      const imageKey = `${displaySize.width}x${displaySize.height}`;
      const imageUrl = element.identifiers[0].identifier;

      res[imageKey] = imageUrl;

      if (imageKey == '200x200') {
        res.default = imageUrl;
      }
    });
  }
  return res;
};

// Linkedin URLs
const linkedinAuth = axios.create({
  baseURL: constants.linkedInURL.auth,
});

const linkedinApi = axios.create({
  baseURL: constants.linkedInURL.api,
});

// Get LinkedIn profile
const getLinkedInProfile = async (authCode, isLocal = false) => {
  try {
    let redirectUri = '';
    if (isLocal) {
      redirectUri = process.env.LINKEDIN_REDIRECT_URI_LOCAL;
    } else {
      redirectUri = process.env.LINKEDIN_REDIRECT_URI;
    }

    // Create auth url
    const authUrl = queryString.stringifyUrl({
      url: constants.linkedInAuthUrlConfig.url,
      query: {
        grant_type: constants.linkedInAuthUrlConfig.grantType,
        code: authCode,
        redirect_uri: redirectUri,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      },
    });

    // profileUrl & emailUrl
    const {profileUrl} = constants.linkedInAuthUrlConfig;
    const {emailUrl} = constants.linkedInAuthUrlConfig;

    // Results object to store the results
    const results = {};

    const response = await linkedinAuth.post(authUrl); // exchange auth code for access token
    results.access_token = response.data.access_token;

    const profileResponse = await linkedinApi.get(profileUrl, {
      // get user profile
      headers: {
        Authorization: `Bearer ${results.access_token}`,
      },
    });
    results.profileResponse = profileResponse;
    results.profileImageUrls = extractImageUrls(profileResponse);

    const emailResponse = await linkedinApi.get(emailUrl, {
      headers: {
        Authorization: `Bearer ${results.access_token}`,
      },
    });

    const finalResponse = {
      firstName: results.profileResponse.data.localizedFirstName,
      lastName: results.profileResponse.data.localizedLastName,
      linkedInId: results.profileResponse.data.id,
      email: emailResponse.data.elements[0]['handle~'].emailAddress,
      profileImageUrls: results.profileImageUrls,
    };
    return finalResponse;
  } catch (error) {
    console.log(error);
    throw new Error({ msg: 'Error in getLinkedInProfile' });
  }
};

// Fetch user token
const fetchUserToken = async (user) => {
  const token = await Token.findOne({ userId: user._id }).exec();
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

module.exports = { handleUserRegistration, getLinkedInProfile, fetchUserToken };
