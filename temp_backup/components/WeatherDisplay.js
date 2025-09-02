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
  // Safely access nested properties
  const weather = data?.weather?.[0] || {};
  const main = data?.main || {};
  const sys = data?.sys || {};
  const name = data?.name || 'Unknown Location';
  
  const date = new Date(data?.dt * 1000);
  const formattedDate = isNaN(date) ? '' : 
    `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

  const getWeatherIcon = (weather) => {
    switch (weather?.main) {
      case "Clear":
        return <WiDaySunny size={60} className="icon" />;
      case "Rain":
        return <WiRain size={60} className="icon" />;
      case "Clouds":
        if (weather?.description?.toLowerCase().includes("overcast")) {
          return <WiCloudy size={60} className="icon" />;
        }
        return <WiCloud size={60} className="icon" />;
      case "Snow":
        return <WiSnow size={60} className="icon" />;
      case "Thunderstorm":
        return <WiThunderstorm size={60} className="icon" />;
      default:
        return <WiCloud size={60} className="icon" />;
    }
  };

  return (
    <motion.div
      className="weather-card glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        borderRadius: 'var(--border-radius)',
        padding: '32px 24px',
        marginBottom: '24px',
        fontFamily: 'Lexend, Arial, sans-serif',
        color: 'var(--text-color)',
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: '1.1rem', marginBottom: 8 }}
      >
        {formattedDate}
      </motion.div>
      <h2 style={{ fontWeight: 700, fontSize: '2rem', margin: '0 0 8px 0' }}>{name}, {sys.country}</h2>
      <div style={{ margin: '16px 0' }}>{getWeatherIcon(weather)}</div>
      <h3 style={{ fontWeight: 700, fontSize: '2.5rem', margin: '0 0 8px 0' }}>{Math.round(main.temp || 0)}°C</h3>
      <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>{weather.description}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: 16 }}>
        <div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Humidity</div>
          <div style={{ fontWeight: 700 }}>{main.humidity || 0}%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Wind</div>
          <div style={{ fontWeight: 700 }}>{data?.wind?.speed || 0} m/s</div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherDisplay;
