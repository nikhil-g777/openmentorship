const User = require('../models/user');
const Token = require('../models/token');
const util = require('../lib/utils');
const constants = require('../lib/constants');

// Handle user registration
const handleUserRegistration = async (req, res, linkedInProfile) => {
  const { body } = req;

  if (body.type == 'linkedInSignup') {
    if (!body.authCode) {
      return res
        .status(400)
        .json({ success: false, error: 'authCode missing in the body' });
    }
    const results = {};

    results.linkedInProfile = linkedInProfile;
    const user = await User.findOne({
      linkedInId: linkedInProfile.linkedInId,
    }).exec();
    let userObj = user;
    if (user) {
      userObj = Object.assign(user, results.linkedInProfile);
    } else {
      userObj = await new User(results.linkedInProfile);
    }
    userObj.profileImageUrls = results.linkedInProfile.profileImageUrls;
    const updatedUser = await userObj.save();
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
        .status(401)
        .json({
          success: false,
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
};

module.exports = { handleUserRegistration };
