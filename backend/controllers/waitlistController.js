const Waitlist = require('../models/waitlist');

const register = async (req, res) => {
  try {
    const { body } = req;

    if (!body) {
      return res
        .status(400)
        .json({ success: false, error: 'request body is empty' });
    }

    if (!body.waitlist) {
      return res.status(400).json({
        success: false,
        error: 'request body does not have a waitlist object',
      });
    }

    const waitlistObj = body.waitlist;

    const createdWaitlist = await Waitlist.create({
      userType: waitlistObj.userType,
      email: waitlistObj.email,
    });

    return res.status(200).json({
      success: true,
      waitlist: createdWaitlist,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err });
  }
};

module.exports = {
  register,
};
