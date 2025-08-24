import React from "react";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function WeatherDisplay({ data }) {
  const weather = data.weather[0];

  const getWeatherIcon = (weather) => {
    switch (weather.main) {
      case "Clear":
        return <WiDaySunny size={80} className="weather-icon" />;
      case "Rain":
        return <WiRain size={80} className="weather-icon" />;
      case "Clouds":
        return <WiCloudy size={80} className="weather-icon" />;
      case "Snow":
        return <WiSnow size={80} className="weather-icon" />;
      case "Thunderstorm":
        return <WiThunderstorm size={80} className="weather-icon" />;
      default:
        return <WiCloud size={80} className="weather-icon" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      className="weather-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>{data.name}, {data.sys.country}</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        {getWeatherIcon(weather)}
        <h1>{Math.round(data.main.temp)}°C</h1>
      </div>
      <p style={{ textTransform: 'capitalize' }}>{weather.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
        <div>
          <p>Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p>{data.wind.speed} m/s</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherDisplay;
