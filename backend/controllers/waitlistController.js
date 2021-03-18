const Waitlist = require('../models/waitlist');

const register = (req, res) => {
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

  Waitlist.create(
    {
      userType: waitlistObj.userType,
      email: waitlistObj.email,
    },
    (err, createdWaitlist) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }

      return res.status(200).json({
        success: true,
        waitlist: createdWaitlist,
      });
    },
  );
};

module.exports = {
  register,
};
