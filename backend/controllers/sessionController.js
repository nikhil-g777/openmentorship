const _ = require('lodash');

const Session = require('../models/session');
const Match = require('../models/match');

const sessionList = async (req, res) => {
  try {
    const sessions = await Session.find({}).sort('startDate').populate('match');
    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Unable to process request',
    });
  }
};

const getMatchesInSession = (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, error: 'sessionId not sent' });
  }

  try {
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
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process request',
    });
  }
};

module.exports = {
  sessionList,
  getMatchesInSession,
};
