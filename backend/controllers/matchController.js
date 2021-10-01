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

  const { menteeId, mentorId } = body.match;

  createChatConversation(menteeId, mentorId)
    .then((result) => {
      Match.create(
        {
          twilioConversationSid: result.conversationSid,
          menteeId,
          mentorId,
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
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
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
};
