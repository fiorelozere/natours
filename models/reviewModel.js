//review , rating , createdAt, reference to the tour , user who wrote
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty']
    },
    rating: {
      type: Number,
      min: [1.0, 'Minimimum rating should be greater than 1.0'],
      max: [5.0, 'Maximum rating should be 5.0'],
      required: [true, 'Rating cannot be null']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to an user']
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour'
  });
  this.populate({
    path: 'user'
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
