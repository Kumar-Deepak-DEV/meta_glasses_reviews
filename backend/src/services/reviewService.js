const Review = require('../models/Review');

exports.getAllReviews = async (query) => {
  const { page = 1, limit = 10, sortBy = 'date', order = 'desc', search, rating, ratingMin, ratingMax, country, verifiedPurchase, sentiment } = query;
  
  const filter = {};
  if (rating && rating !== '') {
    filter.rating = Number(rating);
  } else if (ratingMin || ratingMax) {
    filter.rating = {};
    if (ratingMin) filter.rating.$gte = Number(ratingMin);
    if (ratingMax) filter.rating.$lte = Number(ratingMax);
  }
  if (country && country !== '') filter.country = { $regex: country, $options: 'i' };
  if (verifiedPurchase !== undefined && verifiedPurchase !== '') filter.verifiedPurchase = verifiedPurchase === 'true';
  if (sentiment !== undefined && sentiment !== '') filter.is_positive_review = sentiment === '1' || sentiment === 'true';
  if (search && search !== '') {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { review: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOrder = order === 'asc' ? 1 : -1;
  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return {
    reviews,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalCount: total,
      totalPages: Math.ceil(total / Number(limit)),
    }
  };
};

exports.getReviewById = async (id) => {
  return await Review.findOne({ reviewID: id });
};

exports.createReview = async (data) => {
  return await Review.create(data);
};

exports.updateReview = async (id, data) => {
  return await Review.findOneAndUpdate({ reviewID: id }, data, { new: true, runValidators: true });
};

exports.deleteReview = async (id) => {
  return await Review.findOneAndDelete({ reviewID: id });
};

exports.toggleLikeReview = async (id, action) => {
  const increment = action === 'like' ? 1 : -1;
  return await Review.findOneAndUpdate(
    { reviewID: id },
    { $inc: { helpful_aug: increment } },
    { new: true, runValidators: true }
  );
};
