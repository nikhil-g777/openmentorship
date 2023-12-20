const errorCodes = require('../lib/errorCodes');
const Review = require('../models/review');

// Get all reviews
const getAllReviews = async (req, res) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res.status(400).json({
      success: false,
      error: 'page and limit needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }
  try {
    const reviews = await Review.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('session')
      .exec();
    console.log(reviews);

    // Count total reviews
    const count = await Review.countDocuments();

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
  const { rating, review, personalNote } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: 'sessionId needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  if (!rating || !review) {
    return res.status(400).json({
      success: false,
      error: 'rating and review needs to be sent',
      errorCode: errorCodes.missingInputs.code,
    });
  }

  try {
    // Find by session in reviews and update
    const updatedReview = await Review.findOneAndUpdate(
      { session: sessionId },
      { rating, review, personalNote },
      { upsert: true, new: true },
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

module.exports = { getAllReviews, addReview, getReview };
