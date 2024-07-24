
import React from 'react';
import './weather.css'

const Weather = ({ location, temperature, description }) => {
    return (
        <div className="weather-info">
            <h4>Weather at {location}:</h4>
            <p>Temperature: {temperature} K</p>
            <p>Description: {description}</p>
        </div>
    );
};

export default Weather;
