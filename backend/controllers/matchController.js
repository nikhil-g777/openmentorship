/* eslint no-unused-vars: 0 */

const moment = require('moment');

const { createChatConversation } = require('../config/twilio');

const Match = require('../models/match');
const Session = require('../models/session');

// Created when there is a request from a mentee
const createMatch = (req, res) => {
  // inputs : menteeId, mentorId

  const { body } = req;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  if (!body.match) {
    return res.status(400).json({
      success: false,
      error: 'request body does not have match object',
    });
  }

  const { menteeId, mentorId, requestMessage } = body.match;

  Match.create(
    {
      mentee: menteeId,
      mentor: mentorId,
      requestMessage,
    },
    (err, createdMatch) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }

      return res.status(200).json({
        success: true,
        match: createdMatch,
      });
    },
  );
};

const updateMatch = (req, res) => {
  // inputs : matchId

  const { body } = req;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'request body is empty' });
  }

  const { matchId, status } = body;

  if (!matchId || !status) {
    return res.status(400).json({
      success: false,
      error: 'request body does not have the required parameters',
    });
  }

  Match.findById(matchId)
    .exec()
    .then((match) => {
      const { mentee, mentor } = match;
      if (match.status === 'pending' && status === 'active') {
        Session.create({
          startDate: moment.utc().toDate().toUTCString(),
          status: 'active',
          requestMessage: match.requestMessage,
          match: match._id,
        })
          .then((session) => {
            createChatConversation(mentee, mentor).then((result) => {
              return Match.findByIdAndUpdate(matchId, {
                status,
                latestSession: session._id,
              }).exec();
            });
          })
          .then((updatedMatch) => {
            console.log(updatedMatch);
            return res.status(200).json({
              success: true,
            });
          })
          .catch((e) => {
            console.log(e);
            return res.status(500).json({ success: false });
          });
      } else if (
        (match.status == 'active' || match.status == 'pending') &&
        status == 'closed'
      ) {
        return Match.findByIdAndUpdate(matchId, {
          status,
        })
          .exec()
          .then((updadedMatch) => {
            return Session.findByIdAndUpdate(updadedMatch.latestSession, {
              status,
              emdDate: moment.utc().toDate().toUTCString(),
            });
          })
          .then((updatedSession) => {
            console.log(updatedSession);
            return res.status(200).json({
              success: true,
            });
          })
          .catch((e) => {
            console.log(e);
            return res.status(500).json({ success: false });
          });
      } else {
        throw new Error('Invalid Request');
      }
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
};

module.exports = {
  createMatch,
  updateMatch,
};
