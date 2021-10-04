const { createChatConversation } = require('../config/twilio');

const Match = require('../models/match');

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
      if (match.status === 'pending' && status === 'active')
        createChatConversation(mentee, mentor).then((result) => {
          return Match.findByIdAndUpdate(matchId, {
            status,
            twilioConversationSid: result.conversationSid,
          }).exec();
        });
      else if (
        (match.status == 'active' || match.status == 'pending') &&
        status == 'closed'
      ) {
        return Match.findByIdAndUpdate(matchId, {
          status,
        }).exec();
      } else {
        throw new Error('Invalid Request');
      }
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
};

module.exports = {
  createMatch,
  updateMatch,
};
