// import React, { useState } from 'react';
// import './fare.css';
// import Navbar from './Navbar';
// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';
// import { useTranslation } from 'react-i18next';

// const FareEstimator = () => {
//     const [origin, setOrigin] = useState('');
//     const [destination, setDestination] = useState('');
//     const [vehicleType, setVehicleType] = useState('bus');
//     const [fare, setFare] = useState(null);
//     const { t } = useTranslation();


//     const handleEstimateFare = async () => {
//         try {
//             const response = await fetch('http://localhost:3001/api/estimate-fare', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ origin, destination, vehicleType }),
//             });

//             const data = await response.json();
//             console.log('Estimated Fare:', data.fare);
//             setFare(data.fare);
//         } catch (error) {
//             console.error('Error estimating fare:', error);
//         }
//     };

//     return (
//         <>
//             <Navbar />

//             <section className="main-sec">
//                 <div className="tag-line-box">
//                     <div className="tag-sub">
//                         <h2 className="tag-line">{t('tagLine')}</h2>
//                         <h3 className="tag-sub">{t('tagSub')}</h3>
//                     </div>
//                 </div>
//                 <div className="main-box">
//                     <div className="sub-box">
//                         <div className="src-comp">
//                             <label htmlFor="origin">{t('origin')} : </label>
//                             <input
//                                 type="text"
//                                 id="origin"
//                                 value={origin}
//                                 onChange={(e) => setOrigin(e.target.value)}
//                                 placeholder={t('origin')}
//                             />
//                         </div>

//                         <div className="dest-comp">
//                             <label htmlFor="destination">{t('destination')} : </label>
//                             <input
//                                 type="text"
//                                 id="destination"
//                                 value={destination}
//                                 onChange={(e) => setDestination(e.target.value)}
//                                 placeholder={t('destination')} 
//                             />
//                         </div>

//                         <div className="vehi-comp">
//                             <label htmlFor="vehicle">{t('selectVehicle')} :</label>
//                             <select
//                                 id="vehicleType"
//                                 value={vehicleType}
//                                 onChange={(e) => setVehicleType(e.target.value)}
//                             >
//                                 <option value="bus">{t('bus')}</option>
//                                 <option value="auto">{t('auto')}</option>
//                                 <option value="cab">{t('cab')}</option>
//                             </select>
//                         </div>

//                         <button className="cal-btn" onClick={handleEstimateFare}>
//                         {t('estimateFare')}
//                         </button>

//                         {fare !== null && (
//                             <div className="fare-result">
//                                 <h3>Estimated Fare: {fare}</h3>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </section>

            // {/* Slider main container */}
            // <div className="swiper">
            //     <img
            //         src="https://static.vecteezy.com/system/resources/previews/011/381/915/non_2x/tourist-taking-photo-using-camera-3d-character-illustration-png.png"
            //         alt=""
            //     />
            // </div>
//         </>
//     );
// };

// export default FareEstimator;

import React, { useState } from 'react';
import './fare.css';
import MapComponent from './Map';
import ETAUpdate from './ETA';

import Weather from './Weather';


const FareEstimator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState('bus');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState(null);
  const [weatherOrigin, setWeatherOrigin] = useState(null);
  const [weatherDestination, setWeatherDestination] = useState(null);
  const [rideId, setRideId] = useState(null);

  const handleEstimateFare = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/estimate-fare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origin, destination, vehicleType }),
      });

      const data = await response.json();
      console.log('Estimated Fare:', data.fare);
      setFare(data.fare);
      setRideId(data.rideId);
    } catch (error) {
      console.error('Error estimating fare:', error);
    }
  };

  const fetchSuggestions = async (query, setSuggestions) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error fetching suggestions: ${response.statusText}`);
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleCheckWeather = async () => {
    try {
        const responseOrigin = await fetch(`http://localhost:3001/api/weather?location=${encodeURIComponent(origin)}`);
        const weatherDataOrigin = await responseOrigin.json();
        setWeatherOrigin(weatherDataOrigin);

        const responseDestination = await fetch(`http://localhost:3001/api/weather?location=${encodeURIComponent(destination)}`);
        const weatherDataDestination = await responseDestination.json();
        setWeatherDestination(weatherDataDestination);
    } catch (error) {
        console.error('Error fetching weather information:', error);
    }
};

  const handleOriginChange = (event) => {
    const value = event.target.value;
    setOrigin(value);
    if (value) {
      fetchSuggestions(value, setOriginSuggestions);
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = (event) => {
    const value = event.target.value;
    setDestination(value);
    if (value) {
      fetchSuggestions(value, setDestinationSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, setFunction) => {
    setFunction(suggestion.display_name);
    setOriginSuggestions([]);
    setDestinationSuggestions([]);
  };

  const handleVehicleChange = (event) => {
    setVehicleType(event.target.value);
  };

  return (
    <>
      

      <section className="main-sec">
      <div className="tag-line-box">
        <div className="tag-sub">
          <h2 className='tag-line'>Your Fare, Your Way!</h2>
          <h3 className='tag-sub'>Estimate, Save, Travel!</h3>
        </div>
      </div>
      <div className="main-box">
        <div className="sub-box">
          <div className="src-comp">
            <label htmlFor="origin">Origin: </label>
            <input
              type="text"
              id="origin"
              placeholder="Enter origin"
              value={origin}
              onChange={handleOriginChange}
            />
            <ul>
              {originSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion, setOrigin)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          </div>

          <div className="dest-comp">
            <label htmlFor="destination">Destination: </label>
            <input
              type="text"
              id="destination"
              placeholder="Enter destination"
              value={destination}
              onChange={handleDestinationChange}
            />
            <ul>
              {destinationSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion, setDestination)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          </div>

          <div className="vehi-comp">
            <label htmlFor="vehicle">Select Vehicle: </label>
            <select id="vehicleType" value={vehicleType} onChange={handleVehicleChange}>
              <option value="bus">Bus</option>
              <option value="auto">Auto</option>
              <option value="cab">Cab</option>
            </select>
          </div>

          <div className="btn-div">
          <button className="cal-btn" onClick={handleEstimateFare}>
            Estimate Fare
          </button>
          <button className="cal-btn2" onClick={handleCheckWeather}>
            Check Weather
          </button>
          </div>

          {fare !== null && (
            <div className="fare-result">
              <h3>Estimated Fare: {fare}</h3>
            </div>
          )}
          {/* {origin && destination && <MapComponent source={origin} destination={destination} />} */}

         <div className="weather-div">
           {weatherOrigin && (
              <Weather 
                  location={weatherOrigin.location}
                  temperature={weatherOrigin.temperature}
                  description={weatherOrigin.description}
              />
           )}

           {weatherDestination && (
              <Weather
                  location={weatherDestination.location}
                  temperature={weatherDestination.temperature}
                  description={weatherDestination.description}
              />
           )}
         </div>
        </div>
      </div>
      </section>
      <div className="swiper">
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/381/915/non_2x/tourist-taking-photo-using-camera-3d-character-illustration-png.png"
          alt=""
        />
        <span>
          <img src="https://png.pngtree.com/png-vector/20220107/ourmid/pngtree-equalizerfrequency-with-dots-vector-icon-frequency-sign-vector-vector-png-image_35013202.png" alt="" />
        </span>
      </div>

      
    </>
  );
};

export default FareEstimator;
