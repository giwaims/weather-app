import React from "react";
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
        if (weather.description.toLowerCase().includes("overcast")) {
          return <WiCloudy size={50} className="weather-icon" />;
        }
        return <WiCloud size={50} className="weather-icon" />;
      case "Snow":
        return <WiSnow size={50} className="weather-icon" />;
      case "Thunderstorm":
        return <WiThunderstorm size={50} className="weather-icon" />;
      default:
        return <WiCloud size={50} className="weather-icon" />;
    }
  };

  return (
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-item">
          <p>{new Date(day.dt_txt).toLocaleDateString("en-US", {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })}</p>
          {getWeatherIcon(day.weather[0])}
          <h3>{Math.round(day.main.temp)}°C</h3>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default ForecastDisplay;
