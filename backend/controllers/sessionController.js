const Session = require('../models/session');

const sessionList = (req, res) => {
  Session.find({})
    .sort('startDate')
    .populate('match')
    .exec((err, sessions) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }

      return res.status(200).json({
        success: true,
        sessions,
      });
    });
};

module.exports = {
  sessionList,
};
