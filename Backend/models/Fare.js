// models/Fare.js

const mongoose = require('mongoose');

const fareSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  transportMode: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportMode', required: true },
  fare: { type: Number, required: true },
});

module.exports = mongoose.model('Fare', fareSchema);
