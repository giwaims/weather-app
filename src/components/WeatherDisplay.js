import React from "react";
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
        return <WiDaySunny size={60} className="weather-icon" />;
      case "Rain":
        return <WiRain size={60} className="weather-icon" />;
      case "Clouds":
        if (weather.description.toLowerCase().includes("overcast")) {
          return <WiCloudy size={60} className="weather-icon" />;
        }
        return <WiCloud size={60} className="weather-icon" />;
      case "Snow":
        return <WiSnow size={60} className="weather-icon" />;
      case "Thunderstorm":
        return <WiThunderstorm size={60} className="weather-icon" />;
      default:
        return <WiCloud size={60} className="weather-icon" />;
    }
  };

  return (
    <div className="weather-card">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      {getWeatherIcon(weather)}
      <h3>{data.main.temp}°C</h3>
      <p>{weather.description}</p>
      <p>Feels like: {data.main.feels_like}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherDisplay;
