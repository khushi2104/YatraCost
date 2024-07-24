const Ride = require('../models/Ride');

const trackRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    res.json(ride);
  } catch (error) {
    console.error('Error tracking ride:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { trackRide };
