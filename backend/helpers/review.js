const constructReviewsFilter = (mentorId, sessionId) => {
  const filter = {};
  filter.$or = [];
  if (mentorId) {
    filter.$or.push({ mentor: mentorId });
  }
  if (sessionId) {
    filter.$or.push({ session: sessionId });
  }

  return filter;
};

module.exports = { constructReviewsFilter };
