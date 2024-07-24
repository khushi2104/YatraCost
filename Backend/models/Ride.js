const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  vehicleType: String,
  fare: Number,
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema);
