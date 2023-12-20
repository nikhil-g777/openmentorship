const errorCodes = require('../lib/errorCodes');
const Review = require('../models/review');

// Get all reviews
const getReviews = async (req, res) => {
  const { page, limit, mentorId } = req.query;

  if (!page || !limit) {
    return res.status(400).json({
      success: false,
      error: 'page and limit needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }
  
  try {
    const reviews = await Review.find({mentor: mentorId})
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Count total reviews
    const count = await Review.countDocuments({mentor: mentorId});

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
      error: 'Unable to process request',
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
      error: 'sessionId needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  if (!mentorId || !menteeId || !rating || !review) {
    return res.status(400).json({
      success: false,
      error: 'please provide all required fields',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  try {
    // Find by session in reviews and update
    const updatedReview = await Review.create(
      { session: sessionId, rating, review, personalNote, mentor: mentorId, mentee: menteeId }
    );

    // Return response
    return res.status(200).json({
      success: true,
      review: updatedReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Unable to process request',
      errorCode: errorCodes.serverError.code,
    });
  }
};

// Get Review
const getReview = async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: 'sessionId needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  try {
    // Find by session in reviews and update
    const response = await Review.findOne({ session: sessionId })
      .populate('session')
      .exec();

    // Return response
    return res.status(200).json({
      success: true,
      review: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Unable to process request',
      errorCode: errorCodes.serverError.code,
    });
  }
};

module.exports = { getReviews, addReview, getReview };
