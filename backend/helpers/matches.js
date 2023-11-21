const Match = require('../models/match');
const constants = require('../lib/constants');

const getActiveMentorIds = async (menteeId) => {
  // Throw error if menteeId is not provided
  if (!menteeId) {
    throw new Error('Mentee Id not provided');
  }

  try {
    // Get mentors Ids
    const matches = await Match.find({
      mentee: menteeId,
      status: constants.matchStatuses.active,
    }).select({ mentor: 1, _id: 0 });
    const mentorIds = matches.map((match) => match.mentor);

    return mentorIds;
  } catch (error) {
    return error;
  }
};

module.exports = { getActiveMentorIds };
