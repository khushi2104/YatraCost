// routes/fareRoutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const TransportMode = require('../models/TransportMode');
const Route = require('../models/Route');
const Fare = require('../models/Fare');

// POST /api/fare/estimate
router.post('/estimate', async (req, res) => {
  const { origin, destination } = req.body;

  try {
    // Use Google Maps API to get distance (mock example)
    // Replace with actual Google Maps Distance Matrix API call
    const distance = 10; // Example distance in km
    const baseFare = 20; // Example base fare
    const perKmRate = 5; // Example rate per km

    const estimatedFare = baseFare + (distance * perKmRate);

    res.status(200).json({ fare: estimatedFare });
  } catch (error) {
    console.error('Error estimating fare:', error);
    res.status(500).json({ message: 'Failed to estimate fare' });
  }
});

// routes/fareRoutes.js

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// POST /api/fare/estimate
router.post('/estimate', async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${googleMapsApiKey}`;
    const response = await axios.get(url);

    const distance = response.data.rows[0].elements[0].distance.value / 1000; // distance in km
    const baseFare = 20; // Example base fare
    const perKmRate = 10; // Example rate per km

    const estimatedFare = baseFare + (distance * perKmRate);

    res.status(200).json({ fare: estimatedFare });
  } catch (error) {
    console.error('Error estimating fare:', error);
    res.status(500).json({ message: 'Failed to estimate fare' });
  }
});


module.exports = router;
