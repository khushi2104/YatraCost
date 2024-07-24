// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  transportMode: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportMode', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

module.exports = mongoose.model('Review', reviewSchema);
