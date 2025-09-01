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
        return <WiDaySunny size={50} className="icon" />;
      case "Rain":
        return <WiRain size={50} className="icon" />;
      case "Clouds":
<<<<<<< HEAD
        if (weather.description.toLowerCase().includes("overcast")) {
          return <WiCloudy size={50} className="icon" />;
        }
        return <WiCloud size={50} className="icon" />;
=======
        return <WiCloudy size={50} className="weather-icon" />;
>>>>>>> ec5bc12aadbec775aec3ef64a4f97f723e398f48
      case "Snow":
        return <WiSnow size={50} className="icon" />;
      case "Thunderstorm":
        return <WiThunderstorm size={50} className="icon" />;
      default:
        return <WiCloud size={50} className="icon" />;
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
<<<<<<< HEAD
    <motion.div 
      className="forecast-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ 
        display: 'flex', 
        gap: '24px', 
        justifyContent: 'center', 
        marginTop: '16px',
        overflow: 'hidden'
      }}
    >
      {forecast.map((day, index) => {
        const date = new Date(day.dt_txt);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
        return (
          <motion.div
            key={index}
            className="forecast-item glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            style={{ 
              borderRadius: 'var(--border-radius)',
              padding: '24px',
              minWidth: '120px',
              textAlign: 'center',
              fontFamily: 'Lexend, Arial, sans-serif',
              color: 'var(--text-color)'
            }}
          >
            <div style={{ fontSize: '1rem', marginBottom: 8, opacity: 0.7 }}>{formattedDate}</div>
            <div style={{ margin: '8px 0' }}>{getWeatherIcon(day.weather[0])}</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '0 0 8px 0' }}>{Math.round(day.main.temp)}°C</h3>
            <div style={{ fontSize: '1rem', marginBottom: 8 }}>{day.weather[0].description}</div>
          </motion.div>
        );
      })}
=======
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
>>>>>>> ec5bc12aadbec775aec3ef64a4f97f723e398f48
    </motion.div>
  );
}

export default ForecastDisplay;
