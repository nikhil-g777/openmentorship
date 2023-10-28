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

module.exports = { getAllReviews };
