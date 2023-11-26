// // src/App.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [city, setCity] = useState("");
//   const [suggestedCities, setSuggestedCities] = useState([]);
//   const [weatherData, setWeatherData] = useState(null);
//   const [forecastData, setForecastData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch initial list of suggested cities (optional)
//     fetchSuggestedCities();
//   }, []);

//   const fetchSuggestedCities = async () => {
//     try {
//       const response = await axios.get("https://countriesnow.space/api/v0.1/countries/population/cities");
//       const cities = response.data.data.map(city => city.city);
//       setSuggestedCities(cities);
//     } catch (error) {
//       console.error("Error fetching suggested cities: ", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;
//     setCity(inputValue);

//     // Filter suggested cities based on user input
//     const filteredCities = suggestedCities.filter(
//       (suggestedCity) =>
//         suggestedCity.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
//     );

//     // Update the list of suggested cities
//     setSuggestedCities(filteredCities);
//   };

//   const handleSearch = async () => {
//     try {
//       setError(null);
//       const [currentWeather, forecast] = await Promise.all([
//         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`),
//         axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_API_KEY&units=metric`),
//       ]);
//       setWeatherData(currentWeather.data);
//       setForecastData(forecast.data.list);
//     } catch (error) {
//       console.error('Error fetching weather data: ', error);
//       setWeatherData(null);
//       setForecastData(null);
//       setError('Error fetching weather data. Please try again.');
//     }
//   };

//   const handleClear = () => {
//     setCity("");
//     setWeatherData(null);
//     setForecastData(null);
//     setError(null);
//   };

//   return (
//     <div className="App">
//       <h1>Weather App</h1>
//       <input
//         type="text"
//         placeholder="Enter City"
//         value={city}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <button onClick={handleClear}>Clear</button>

//       {error && <p className="error-message">{error}</p>}

//       {weatherData && (
//         <div>
//           <h2>{weatherData.name}</h2>
//           <p>Temperature: {weatherData.main.temp} °C</p>
//           <p>Weather: {weatherData.weather[0].description}</p>
//         </div>
//       )}

//       {forecastData && (
//         <div>
//           <h2>Five-Day Forecast</h2>
//           <div className="forecast-container">
//             {forecastData.map((forecast) => (
//               <div key={forecast.dt} className="forecast-item">
//                 <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
//                 <p>Temperature: {forecast.main.temp} °C</p>
//                 <p>Weather: {forecast.weather[0].description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Display suggested cities */}
//       {suggestedCities.length > 0 && (
//         <div>
//           <h3>Suggested Cities</h3>
//           <ul>
//             {suggestedCities.map((suggestedCity) => (
//               <li key={suggestedCity} onClick={() => setCity(suggestedCity)}>
//                 {suggestedCity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;