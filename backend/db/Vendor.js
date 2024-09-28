const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ratings: { type: [Number], default: [] }
});

// Calculate average rating
vendorSchema.methods.averageRating = function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((acc, rating) => acc + rating, 0);
  return total / this.ratings.length;
};

module.exports = mongoose.model('vendors', vendorSchema);
