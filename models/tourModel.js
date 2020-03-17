const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A Tour duration must be specified']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour max group size must be specified']
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour difficulty must be specified']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A Tour summary must be specified']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour image must be specified']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
