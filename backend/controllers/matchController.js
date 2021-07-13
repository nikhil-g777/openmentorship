const _ = require('lodash');

const Match = require('../models/match');
const User = require('../models/user');

const getMatches = (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    return res.status(400).json({ success: false, error: '_id not sent' });
  }

  User.findById(_id).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: 'user not found' });
    }

    const { userType } = user;

    const findQuery = {};

    if (user.userType === 'mentee') {
      findQuery.menteeId = _id;
    } else if (user.userType === 'mentor') {
      findQuery.mentorId = _id;
    } else {
      return res
        .status(404)
        .json({ success: false, error: 'user type in invalid' });
    }

    Match.find(findQuery)
      .populate('mentorId')
      .populate('menteeId')
      .exec((matchErr, matchesList) => {
        if (matchErr) {
          console.log(err);
          return res.status(500).json({ success: false, error: matchErr });
        }

        console.log(matchesList);

        const result = { pending: [], active: [], closed: [] };

        _.forEach(matchesList, (match) => {
          switch (userType) {
            case 'mentor':
              result[match.status].push(match.menteeId);
              break;
            case 'mentee':
              result[match.status].push(match.mentorId);
              break;
            default:
              console.log('Invalid user type');
          }
        });

        return res.status(200).json({
          success: true,
          matches: result,
        });
      });
  });
};

const sendMessage = (req, res) => {
  const { _id, userType } = req.user;
  const { matchId } = req.params;
  const { body } = req;

  if (!_id) {
    return res.status(400).json({ success: false, error: 'User not found' });
  }

  if (!matchId) {
    return res
      .status(400)
      .json({ success: false, error: 'matchId must be sent' });
  }

  Match.findById(matchId)
    .then((match) => {
      if (userType != 'mentee' || !match.menteeId.equals(_id)) {
        return res.status(400).json({
          success: false,
          error: 'Not authorized to send this message',
        });
      }

      if (match.initialMessage) {
        // message is already present
        return res.status(400).json({
          success: false,
          error: 'Message already sent, cannot overwrite',
        });
      }

      Match.findByIdAndUpdate(matchId, {
        initialMessage: body.initialMessage,
      }).then(() => {
        return res.status(200).json({
          success: true,
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

const createMatch = (req, res) => {
  const { menteeId, mentorId, sessionId } = req.body;

  if (!menteeId || !mentorId) {
    res
      .status(400)
      .json({ success: false, error: 'menteeId and mentorId must be sent' });
  }

  Match.create({ menteeId, mentorId, sessionId })
    .then((createdMatch) => {
      return res.status(200).json({
        success: true,
        matchId: createdMatch._id,
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

/*
const updateMatch = (req, res) => {
  // inputs : matchId, status

  // if (status == 'active')
  // create a new channel in twilio
  // update the match record with the status='active', twilioChannelId
  //else
  // update the match record with the status

  // return matchId
}
*/

module.exports = {
  createMatch,
  getMatches,
  sendMessage,
};
