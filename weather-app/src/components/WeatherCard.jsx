import { WiDayCloudy, WiDaySunny, WiRain, WiSnow } from "react-icons/wi";
import { FaTint, FaWind } from "react-icons/fa";

function WeatherCard({ weather }) {
  const getWeatherInfo = (code) => {
    if (code === 0) {
      return {
        text: "Clear Sky",
        icon: <WiDaySunny className="weather-icon" />,
      };
    }

    if (code >= 1 && code <= 3) {
      return { text: "Cloudy", icon: <WiDayCloudy className="weather-icon" /> };
    }

    if (code >= 51 && code <= 67) {
      return { text: "Rainy", icon: <WiRain className="weather-icon" /> };
    }

    if (code >= 71 && code <= 77) {
      return { text: "Snowy", icon: <WiSnow className="weather-icon" /> };
    }

    if (code >= 80 && code <= 82) {
      return { text: "Rainy", icon: <WiRain className="weather-icon" /> };
    }

    return {
      text: "Cloudy",
      icon: <WiDayCloudy className="weather-icon" />,
    };
  };

  const weatherInfo = getWeatherInfo(weather.weatherCode);

  return (
    <div className="weather-card">
      <h2>
        {weather.city}
        {weather.country && `, ${weather.country}`}
      </h2>

      {weatherInfo.icon}

      <h1>{Math.round(weather.temperature)}°C</h1>

      <h3>{weatherInfo.text}</h3>

      <div className="weather-info">
        <p>
          <FaTint className="info-icon" />
          <strong> Humidity:</strong> {weather.humidity}%
        </p>

        <p>
          <FaWind className="info-icon" />
          <strong> Wind:</strong> {weather.wind} km/h
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;