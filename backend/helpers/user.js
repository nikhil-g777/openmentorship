require('dotenv').config();
const queryString = require('query-string');
const axios = require('axios');
const User = require('../models/user');
const Token = require('../models/token');
const util = require('../lib/utils');
const constants = require('../lib/constants');
const config = require('../config/config');
const { sendMail } = require('../lib/mailer');
const errorCodes = require('../lib/errorCodes');

// Handle user registration
const handleUserRegistration = async (req, res, currentProfile) => {
  const { body } = req;
  const isGoogle = body.type == constants.authProviders.google;

  try {
    if (body.type == constants.bodyType.registration) {
      if (!body.authCode) {
        return res
          .status(400)
          .json({ success: false, errorCode: errorCodes.missingInputs, message: 'authCode missing in the body.' });
      }

      // Check if user already exists
      const user = await User.findOne(
        isGoogle ? { googleId: currentProfile.googleId } : { linkedInId: currentProfile.linkedInId },
      );

      // If user exists, assign linkedInProfile to user or create new user
      let userObj = user;
      if (user) {
        userObj = Object.assign(user, currentProfile);
      } else {
        userObj = await new User(currentProfile);
      }

      // Add profile image urls and save user
      userObj.profileImageUrls = currentProfile.profileImageUrls;
      const updatedUser = await userObj.save();

      const token = await Token.findOne({ userId: updatedUser._id });
      // if token isn't in our DB, store
      if (!token) {
        // encrypt information
        const t = util.refreshToken(updatedUser._id);

        Token.create({
          refreshToken: t,
          userId: updatedUser._id,
        });
      }
      // send the access token
      const accessToken = util.accessToken(updatedUser._id);
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
            registrationStatus: constants.registrationStatus.incomplete.name,
            token: accessToken,
            user: {
              _id: updatedUser._id,
              firstName: currentProfile.firstName,
              lastName: currentProfile.lastName,
              linkedInId: currentProfile.linkedInId,
              email: currentProfile.email,
            },
          })
      );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      errorCode: errorCodes.registerServerError.code,
      message: 'Unable to register user.',
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
    const { profileUrl } = constants.linkedInAuthUrlConfig;
    const { emailUrl } = constants.linkedInAuthUrlConfig;

    const response = await linkedinAuth.post(authUrl); // exchange auth code for access token
    const accessToken = response.data.access_token;

    const profileResponse = await linkedinApi.get(profileUrl, {
      // get user profile
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const profileImageUrls = extractImageUrls(profileResponse);

    const emailResponse = await linkedinApi.get(emailUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const finalResponse = {
      firstName: profileResponse.data.localizedFirstName,
      lastName: profileResponse.data.localizedLastName,
      linkedInId: profileResponse.data.id,
      email: emailResponse.data.elements[0]['handle~'].emailAddress,
      profileImageUrls,
    };
    return finalResponse;
  } catch (error) {
    console.log(error);
    throw new Error({ msg: 'Error in getLinkedInProfile' });
  }
};

// Fetch user token
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

// Send Confirmation Email
const sendRegistrationMail = async (user) => {
  try {
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
    return { success: true, response };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      response: null,
    };
  }
};

// Create Google profile template
const createGoogleProfileTemplate = (userDetails) => {
  const profileImageUrls = {
    default: userDetails.picture,
  };
  return {
    firstName: userDetails.given_name,
    lastName: userDetails.family_name,
    googleId: userDetails.sub,
    email: userDetails.email,
    profileImageUrls,
  };
};

// Google URLs
const googleAuth = constants.googleURL.auth;
const googleProfile = constants.googleURL.profile;

// Get Google Profile
const getGoogleProfile = async (authCode, isLocal = false) => {
  const code = decodeURIComponent(authCode);
  const redirectUri = isLocal ? process.env.GOOGLE_REDIRECT_URI_LOCAL : process.env.GOOGLE_REDIRECT_URI;
  const response = await axios.post(
    googleAuth,
    {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      access_type: constants.googleAuthUrlConfig.access_type,
      redirect_uri: redirectUri,
      grant_type: constants.googleAuthUrlConfig.grantType,
    }
  );
  const accessToken = response.data.access_token;

  // Fetch user details using the access token
  const userResponse = await axios.get(
    googleProfile,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  const userDetails = userResponse.data;
  const profile = createGoogleProfileTemplate(userDetails);
  return profile;
};

module.exports = {
  handleUserRegistration,
  getLinkedInProfile,
  fetchUserToken,
  sendRegistrationMail,
  getGoogleProfile,
};
