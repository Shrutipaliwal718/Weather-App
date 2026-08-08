import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async (city) => {
    const enteredCity = city.trim();

    // Empty search validation
    if (!enteredCity) {
      setWeather(null);
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Find city coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          enteredCity
        )}&count=1&language=en&format=json&countryCode=IN`
      )

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const location = geoData.results[0];

      // Require complete city name
      const foundCity = location.name.trim().toLowerCase();

      if (enteredCity.toLowerCase() !== foundCity) {
        throw new Error("Please enter a valid city name.");
      }

      // Get current weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to fetch weather data");
      }

      const weatherData = await weatherResponse.json();

      setWeather({
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
      });
      setForecast(
        weatherData.daily.time.map((date, index) => ({
          date,
          maxTemp: weatherData.daily.temperature_2m_max[index],
          minTemp: weatherData.daily.temperature_2m_min[index],
          weatherCode: weatherData.daily.weather_code[index],
        }))
      );
    } catch (err) {
      setWeather(null);
      setError(err.message || "Unable to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="weather-container" >
        <h1>Weather App</h1>

        <p>Check the current weather of any city. </p>

        <SearchBar onSearch={searchWeather} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Fetching weather...</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {weather && <WeatherCard weather={weather} />}

        {forecast.length > 0 && <Forecast forecast={forecast} />}

      </div>
    </div>
  );
}

export default App;