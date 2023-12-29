const Match = require('../models/match');
const constants = require('../lib/constants');
const { sendMail } = require('../lib/mailer');
const config = require('../config/config');

const getActiveMentorIds = async (menteeId) => {
  // Get mentors Ids
  const matches = await Match.find({
    mentee: menteeId,
    status: constants.matchStatuses.active,
  }).select({ mentor: 1, _id: 0 });
  const mentorIds = matches.map((match) => match.mentor);

  return mentorIds;
};

const reconnectMentor = async (res, body) => {
  const { matchId, requestMessage } = body;
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

  return res.status(200).json({
    success: true,
    updatedMatch,
  });
};

module.exports = { getActiveMentorIds, reconnectMentor };
