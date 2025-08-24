import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

const WeatherDisplay = React.lazy(() => import("./components/WeatherDisplay"));
const ForecastDisplay = React.lazy(() => import("./components/ForecastDisplay"));

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    const apiKey = "c730bd9f12dc88df365cad0bbdb21de9";
    setLoading(true);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weatherJson = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastJson = await forecastRes.json();

      setWeatherData(weatherJson);

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
      const forecastArray = Object.values(forecastByDay).slice(0, 5); // Show 5 days
      setForecastData(forecastArray);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="header">
        <h1 className="skycast-title">SkyCast</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar onSearch={fetchWeather} />
        </div>
      </header>
      {loading && <LoadingSpinner />}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="weather-container">
          {weatherData && <WeatherDisplay data={weatherData} />}
          {forecastData.length > 0 && <ForecastDisplay forecast={forecastData} />}
        </div>
      </Suspense>
    </motion.div>
  );
}

export default App;
