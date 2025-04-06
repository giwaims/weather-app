import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch weather and forecast data for the given city
  const fetchWeather = async (city) => {
    const apiKey = "c730bd9f12dc88df365cad0bbdb21de9";
    setLoading(true);
    try {
      // Fetch current weather data
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weatherJson = await weatherRes.json();

      // Fetch forecast data
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastJson = await forecastRes.json();

      setWeatherData(weatherJson);

      // Process forecast: select entries after now and group by day (select one per day)
      const now = new Date();
      const forecasts = forecastJson.list.filter((item) => {
        const itemDate = new Date(item.dt_txt);
        return itemDate > now;
      });

      const forecastByDay = {};
      forecasts.forEach((item) => {
        const day = new Date(item.dt_txt).toLocaleDateString("en-GB");
        if (!forecastByDay[day]) {
          forecastByDay[day] = item;
        }
      });
      // Select the next two days
      const forecastArray = Object.values(forecastByDay).slice(0, 2);
      setForecastData(forecastArray);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="skycast-title">SkyCast</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar onSearch={fetchWeather} />
          {loading && <LoadingSpinner />}
        </div>
      </header>
      <div className="weather-container">
        {weatherData && <WeatherDisplay data={weatherData} />}
        {forecastData.length > 0 && <ForecastDisplay forecast={forecastData} />}
      </div>
    </div>
  );
}

export default App;
