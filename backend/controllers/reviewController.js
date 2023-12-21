const { constructReviewsFilter } = require('../helpers/review');
const errorCodes = require('../lib/errorCodes');
const Review = require('../models/review');

// Get reviews for a mentor
const getReviews = async (req, res) => {
  const { page, limit, mentorId, sessionId } = req.query;

  // Check if all required fields are sent
  if ((!mentorId && !sessionId) || !page || !limit) {
    return res.status(400).json({
      success: false,
      message: 'please provide all required fields',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  // Filter
  const filter = constructReviewsFilter(mentorId, sessionId);

  try {
    const reviews = await Review.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('session')
      .exec();

    // Count total reviews
    const count = await Review.countDocuments(filter);

    // Return response
    return res.status(200).json({
      success: true,
      reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process request',
      errorCode: errorCodes.serverError.code,
    });
  }
};

// Add a review
const addReview = async (req, res) => {
  const { sessionId } = req.query;
  const { mentorId, menteeId, rating, review, personalNote } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: 'sessionId needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  if (!mentorId || !menteeId || !rating || !review) {
    return res.status(400).json({
      success: false,
      message: 'please provide all required fields',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  try {
    // Find by session in reviews and update
    const createdReview = await Review.create({
      session: sessionId,
      rating,
      review,
      personalNote,
      mentor: mentorId,
      mentee: menteeId,
    });

    // Return response
    return res.status(200).json({
      success: true,
      review: createdReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process request',
      errorCode: errorCodes.serverError.code,
    });
  }
};

module.exports = { getReviews, addReview };
