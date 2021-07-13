const _ = require('lodash');

const Session = require('../models/session');
const Match = require('../models/match');

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
    .then((sessions) => {
      return res.status(200).json({
        success: true,
        sessions,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Unable to process request',
      });
    });
};

const getMatchesInSession = (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, error: 'sessionId not sent' });
  }

  Match.find({ sessionId })
    .populate('menteeId')
    .populate('mentorId')
    .then((matchesList) => {
      const result = { pending: [], active: [], closed: [] };
      _.forEach(matchesList, (match) => {
        result[match.status].push({
          _id: match._id,
          mentee: match.menteeId,
          mentor: match.mentorId,
        });
      });

      return res.status(200).json({
        success: true,
        matches: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Failed to process request',
      });
    });
};

module.exports = {
  create,
  sessionList,
  getMatchesInSession,
};
