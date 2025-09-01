<<<<<<< HEAD
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

=======
import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

const WeatherDisplay = React.lazy(() => import("./components/WeatherDisplay"));
const ForecastDisplay = React.lazy(() => import("./components/ForecastDisplay"));
>>>>>>> ec5bc12aadbec775aec3ef64a4f97f723e398f48

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
      if (!weatherRes.ok) {
        throw new Error(weatherJson.message || 'Failed to fetch weather data');
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastJson = await forecastRes.json();
      if (!forecastRes.ok) {
        throw new Error(forecastJson.message || 'Failed to fetch forecast data');
      }

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

  // Lazy load components
  const SearchBar = React.lazy(() => import("./components/SearchBar"));
  const WeatherDisplay = React.lazy(() => import("./components/WeatherDisplay"));
  const ForecastDisplay = React.lazy(() => import("./components/ForecastDisplay"));
  const LoadingSpinner = React.lazy(() => import("./components/LoadingSpinner"));

  return (
<<<<<<< HEAD
    <div className="app-container glass">
      <header className="header" style={{ justifyContent: 'center', marginBottom: 24 }}>
        <h1 className="skycast-title" style={{ fontFamily: 'Lexend', fontWeight: 700, color: '#fff', letterSpacing: 2 }}>SkyCast</h1>
      </header>
      <React.Suspense fallback={<div style={{ textAlign: 'center', margin: 32 }}><span>Loading...</span></div>}>
        <SearchBar onSearch={fetchWeather} />
      </React.Suspense>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <LoadingSpinner />
            </React.Suspense>
          </motion.div>
        ) : weatherData ? (
          <motion.div key="weather" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <WeatherDisplay data={weatherData} />
            </React.Suspense>
            {forecastData.length > 0 && (
              <React.Suspense fallback={<div>Loading...</div>}>
                <ForecastDisplay forecast={forecastData} />
              </React.Suspense>
            )}
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ textAlign: 'center', margin: '32px 0', color: '#bbb' }}>
              <p>Enter a city to view the weather.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
=======
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
>>>>>>> ec5bc12aadbec775aec3ef64a4f97f723e398f48
  );
}

export default App;
