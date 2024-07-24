const axios = require('axios');

const getETA = async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const [originResponse, destinationResponse] = await Promise.all([
      axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(origin)}&format=json&limit=1`),
      axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`)
    ]);

    if (!originResponse.data[0] || !destinationResponse.data[0]) {
      return res.status(400).json({ error: 'Invalid origin or destination' });
    }

    const originCoords = originResponse.data[0];
    const destinationCoords = destinationResponse.data[0];

    const distanceResponse = await axios.get(`http://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?overview=false`);
    const duration = distanceResponse.data.routes[0].duration / 60; // in minutes

    res.json({ eta: duration });
  } catch (error) {
    console.error('Error fetching ETA:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getETA };
