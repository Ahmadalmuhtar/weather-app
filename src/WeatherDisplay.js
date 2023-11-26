// src/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
    return (
        <div>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
