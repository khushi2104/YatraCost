const mongoose = require('mongoose');

const transportModeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'bus', 'auto', 'cab', 'metro'
  provider: { type: String, required: true },
});

module.exports = mongoose.model('TransportMode', transportModeSchema);