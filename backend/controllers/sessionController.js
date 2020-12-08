const Session = require('../models/session');

const create = (req, res) => {
  const { body } = req;

  // Check for role == admin

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  if (!body.session) {
    return res.status(400).json({
      success: false,
      error: 'request body does not have session object',
    });
  }

  const sessionObj = body.session;

  Session.create(
    {
      startDate: sessionObj.startDate,
      endDate: sessionObj.endDate,
      status: sessionObj.status,
    },
    (err, createdSession) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }

      return res.status(200).json({
        success: true,
        session: createdSession,
      });
    },
  );
};

const sessionList = (req, res) => {
  Session.find({})
    .sort('startDate')
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
  create,
  sessionList,
};
