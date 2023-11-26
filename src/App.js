import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
      );
      console.log('API Response:', response.data);
      setWeatherData({
        name: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windspeed: response.data.main.windspeed,
      });
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleClear = () => {
    setCity('');
    setWeatherData(null);
    setError(null);
  };


  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <WeatherDisplay weatherData={weatherData} />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default App;