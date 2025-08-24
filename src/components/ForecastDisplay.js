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

function ForecastDisplay({ forecast }) {
  const getWeatherIcon = (weather) => {
    switch (weather.main) {
      case "Clear":
        return <WiDaySunny size={50} className="weather-icon" />;
      case "Rain":
        return <WiRain size={50} className="weather-icon" />;
      case "Clouds":
        return <WiCloudy size={50} className="weather-icon" />;
      case "Snow":
        return <WiSnow size={50} className="weather-icon" />;
      case "Thunderstorm":
        return <WiThunderstorm size={50} className="weather-icon" />;
      default:
        return <WiCloud size={50} className="weather-icon" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  return (
    <motion.div
      className="forecast-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {forecast.map((day, index) => (
        <motion.div key={index} className="forecast-item" variants={itemVariants}>
          <p>{formatDate(day.dt_txt)}</p>
          {getWeatherIcon(day.weather[0])}
          <h3>{Math.round(day.main.temp)}°C</h3>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ForecastDisplay;
