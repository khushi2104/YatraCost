// models/Route.js

const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  distance: { type: Number, required: true },
});

module.exports = mongoose.model('Route', routeSchema);
