const Review = require('../models/review');

// Get all reviews
const getAllReviews = async (req, res) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res.status(400).json({
      success: false,
      error: 'page and limit needs to be sent',
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
        });
    }

    if (!rating || !review) {
        return res.status(400).json({
            success: false,
            error: 'rating and review needs to be sent',
        });
    }

    try {
        // Find by session in reviews and update
        const updatedReview = await Review.findOneAndUpdate(
            { session: sessionId },
            { rating, review, personalNote },
            { upsert: true, new: true }
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
        }); 
    }
};

module.exports = { getAllReviews, addReview };
