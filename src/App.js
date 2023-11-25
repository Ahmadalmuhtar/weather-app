// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const [currentWeather, forecast] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_API_KEY&units=metric`),
      ]);
      setWeatherData(currentWeather.data);
      setForecastData(forecast.data.list);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      setWeatherData(null);
      setForecastData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleClear = () => {
    setCity("");
    setWeatherData(null);
    setForecastData(null);
    setError(null);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

      {forecastData && (
        <div>
          <h2>Five-Day Forecast</h2>
          <div className="forecast-container">
            {forecastData.map((forecast) => (
              <div key={forecast.dt} className="forecast-item">
                <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {forecast.main.temp} °C</p>
                <p>Weather: {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;