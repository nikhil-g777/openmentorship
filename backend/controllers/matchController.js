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

  Match.exists({ mentee: menteeId, mentor: mentorId })
    .then((exists) => {
      if (exists) {
        return res
          .status(500)
          .json({ success: false, error: 'Match already exists' });
      }
      return Match.create({
        mentee: menteeId,
        mentor: mentorId,
        requestMessage,
      });
    })
    .then((createdMatch) => {
      return res.status(200).json({
        success: true,
        match: createdMatch,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
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
      if (
        (match.status == 'pending' || match.status == 'closed') &&
        status === 'active'
      ) {
        let requestMessage = '';
        if (match.status == 'closed') {
          // reconnecting
          requestMessage = body.requestMessage;
        } else {
          requestMessage = match.requestMessage;
        }

        createChatConversation(mentee, mentor)
          .then((chatResult) => {
            return Session.create({
              match: match._id,
              requestMessage,
              startDate: moment.utc().toDate().toUTCString(),
              status: 'active',
              twilioConversationSid: chatResult.conversationSid,
            }).then((session) => {
              return Match.findByIdAndUpdate(
                matchId,
                {
                  status,
                  latestSession: session._id,
                  requestMessage,
                },
                { new: true },
              )
                .populate('mentor')
                .populate('mentee')
                .populate('latestSession')
                .exec();
            });
          })
          .then((updatedMatch) => {
            console.log(updatedMatch);
            return res.status(200).json({
              success: true,
              updatedMatch,
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
        const results = {};
        return Match.findByIdAndUpdate(
          matchId,
          {
            status,
          },
          { new: true },
        )
          .exec()
          .populate('mentor')
          .populate('mentee')
          .populate('latestSession')
          .then((updatedMatch) => {
            results.updatedMatch = updatedMatch;
            return Session.findByIdAndUpdate(updatedMatch.latestSession, {
              status,
              emdDate: moment.utc().toDate().toUTCString(),
            });
          })
          .then((updatedSession) => {
            return res.status(200).json({
              success: true,
              updatedMatch: results.updatedMatch,
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
