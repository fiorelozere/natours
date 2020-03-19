const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [40, 'Tour name must have less or equal 40 characters'],
      minLength: [10, 'Tour name must have at least 10 characters']
    },
    slug: String,
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
      required: [true, 'A Tour difficulty must be specified'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be easy, medium, or hard'
      }
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be greater than 1.0'],
      max: [5, 'Rating must be less or equal to 5.0']
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discount price should be below or equal to price'
      }
    },
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
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
//DOCUMENT MIDDLEWARE: runs before the save() command and .create() command
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//QUERY MIDDLEWARE

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(docs);
  next();
});
//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
