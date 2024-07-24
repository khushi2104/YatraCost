// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// app.post('/api/estimate-fare', async (req, res) => {
//     const { origin, destination, vehicleType } = req.body;
//     console.log('Received request:', { origin, destination, vehicleType }); // Add logging

//     try {
//         const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//             params: {
//                 origins: origin,
//                 destinations: destination,
//                 key: 'YOUR_GOOGLE_MAPS_API_KEY',
//             },
//         });

//         console.log('Google Maps API response:', response.data); // Add logging

//         const distance = response.data.rows[0].elements[0].distance.value / 1000; // distance in km
//         console.log('Calculated distance:', distance); // Add logging

//         let fare;
//         switch (vehicleType) {
//             case 'bus':
//                 fare = distance * 10; // example fare calculation for bus
//                 break;
//             case 'auto':
//                 fare = distance * 15; // example fare calculation for auto
//                 break;
//             case 'cab':
//                 fare = distance * 20; // example fare calculation for cab
//                 break;
//             default:
//                 fare = distance * 10; // default fare calculation
//         }

//         console.log('Calculated fare:', fare); // Add logging
//         res.json({ fare });

//     } catch (error) {
//         console.error('Error estimating fare:', error); // Add logging
//         res.status(500).json({ error: 'Failed to estimate fare' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const etaRoutes = require('./Routes/eta.js');
const trackingRoutes = require('./Routes/tracking.js');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

app.use('/api', etaRoutes);
app.use('/api', trackingRoutes);


// Socket.IO for real-time updates
io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('trackRide', (rideId) => {
      console.log(`Tracking ride: ${rideId}`);
      // Emit ride updates to the client
      const interval = setInterval(async () => {
        const ride = await Ride.findById(rideId);
        if (ride) {
          socket.emit('rideUpdate', ride);
        }
      }, 5000);
  
      socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('Client disconnected');
      });
    });
  });

  
app.post('/api/estimate-fare', async (req, res) => {
    const { origin, destination, vehicleType } = req.body;

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
        const distance = distanceResponse.data.routes[0].distance / 1000; // in km

        // Basic fare calculation
        let fare;
        switch (vehicleType) {
            case 'bus':
                fare = distance * 1; // Example rate
                break;
            case 'auto':
                fare = distance * 2; // Example rate
                break;
            case 'cab':
                fare = distance * 3; // Example rate
                break;
            default:
                fare = distance * 1; // Default rate
                break;
        }

        res.json({ fare });
    } catch (error) {
        console.error('Error estimating fare:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const ROUTE_API_URL = 'http://router.project-osrm.org/route/v1/driving';

// Endpoint to handle geocoding requests
app.get('/api/geocode', async (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
        const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address,
                key: GEOCODE_API_KEY,
            },
        });

        if (geocodeResponse.data.results.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
        res.json({ lat, lng });
    } catch (error) {
        console.error('Error geocoding address:', error);
        res.status(500).json({ error: 'Error geocoding address' });
    }
});

// Endpoint to handle route calculation requests
app.get('/api/route', async (req, res) => {
    const { originLat, originLng, destLat, destLng } = req.query;
    if (!originLat || !originLng || !destLat || !destLng) {
        return res.status(400).json({ error: 'Origin and destination coordinates are required' });
    }

    try {
        const routeResponse = await axios.get(`${ROUTE_API_URL}/${originLng},${originLat};${destLng},${destLat}?overview=false`);

        if (!routeResponse.data.routes || routeResponse.data.routes.length === 0) {
            return res.status(404).json({ error: 'Route not found' });
        }

        const route = routeResponse.data.routes[0];
        const { distance, duration, geometry } = route;
        res.json({ distance, duration, geometry });
    } catch (error) {
        console.error('Error calculating route:', error);
        res.status(500).json({ error: 'Error calculating route' });
    }
});

app.get('/api/weather', async (req, res) => {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: 'Missing location parameter' });
    }

    try {
        const apiKey = '2a69cd82392ade7e6473e0ef730d6370';
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        const weatherData = weatherResponse.data;

        const weatherInfo = {
            location: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
        };

        res.json(weatherInfo);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
