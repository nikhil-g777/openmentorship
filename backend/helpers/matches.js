const moment = require('moment');
const Match = require('../models/match');
const Session = require('../models/session');
const constants = require('../lib/constants');
const { sendMail } = require('../lib/mailer');
const config = require('../config/config');
const { createChatConversation } = require('../config/twilio');

const getActiveMentorIds = async (menteeId) => {
  // Get mentors Ids
  const matches = await Match.find({
    mentee: menteeId,
    status: constants.matchStatuses.active,
  }).select({ mentor: 1, _id: 0 });
  const mentorIds = matches.map((match) => match.mentor);

  return mentorIds;
};

/**
 * Update a match status to pending and send mentee request sendgrid email.
 * @param {string} matchId - match to update
 * @param {string} requestMessage - mentee's request message
 * @return {Match} - Updated match object
 */
const reconnectMentor = async (matchId, requestMessage) => {
  const updatedMatch = await Match.findByIdAndUpdate(
    matchId,
    {
      status: constants.matchStatuses.pending,
      requestMessage,
    },
    { new: true },
  )
    .populate('mentor')
    .populate('mentee')
    .populate('latestSession')
    .exec();

  // Send connection_request email to mentor.
  await sendMail(
    updatedMatch.mentor.email,
    'Openmentorship: New Mentee Request',
    {},
    config.sendgrid.templates.connection_request,
  );

  return updatedMatch;
};

/**
 * create twilio conversation & session and update the match.
 * @param {string} matchId - match to update
 * @param {string} status - new status
 * @param {Match} match - match object
 * @return {Match} - Updated match object
 */
const acceptMatch = async (matchId, status, match) => {
  const { mentee, mentor, requestMessage } = match;
  const chatResult = await createChatConversation(mentee, mentor);

  const session = await Session.create({
    match: match._id,
    requestMessage,
    startDate: moment.utc().toDate().toUTCString(),
    status: 'active',
    twilioConversationSid: chatResult.conversationSid,
  });

  const updatedMatch = await Match.findByIdAndUpdate(
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

  return updatedMatch;
};

/**
 * Close a match and update the associated session.
 * @param {string} matchId - match to update
 * @param {string} status - new status
 * @return {Match} - Updated match object
 */
const closeMatch = async (matchId, status) => {
  const updatedMatch = await Match.findByIdAndUpdate(
    matchId,
    {
      status,
    },
    { new: true },
  )
    .populate('mentor')
    .populate('mentee')
    .populate('latestSession')
    .exec();

  await Session.findByIdAndUpdate(updatedMatch.latestSession, {
    status,
    endDate: moment.utc().toDate().toUTCString(),
  });

  return updatedMatch;
};

module.exports = {
  getActiveMentorIds,
  reconnectMentor,
  acceptMatch,
  closeMatch,
};
