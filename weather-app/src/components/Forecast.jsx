import { WiDaySunny, WiDayCloudy, WiRain, WiSnow } from "react-icons/wi";

function Forecast({ forecast }) {
  const getWeatherInfo = (code) => {
    if (code === 0) {
      return {
        text: "Clear",
        icon: <WiDaySunny className="forecast-icon" />,
      };
    }

    if (code >= 1 && code <= 3) {
      return {
        text: "Cloudy",
        icon: <WiDayCloudy className="forecast-icon" />,
      };
    }

    if (code >= 51 && code <= 67) {
      return {
        text: "Rainy",
        icon: <WiRain className="forecast-icon" />,
      };
    }

    if (code >= 71 && code <= 77) {
      return {
        text: "Snowy",
        icon: <WiSnow className="forecast-icon" />,
      };
    }

    if (code >= 80 && code <= 82) {
      return {
        text: "Rainy",
        icon: <WiRain className="forecast-icon" />,
      };
    }

    return {
      text: "Cloudy",
      icon: <WiDayCloudy className="forecast-icon" />,
    };
  };

  return (
    <div className="forecast-section">
      <h2>5-Day Forecast</h2>

      <div className="forecast-container">
        {forecast.map((day, index) => {
          const weatherInfo = getWeatherInfo(day.weatherCode);

          const date = new Date(day.date);

          return (
            <div className="forecast-card" key={index}>
              <h3>
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>

              {weatherInfo.icon}

              <p className="forecast-condition">
                {weatherInfo.text}
              </p>

              <p>
                <strong>{Math.round(day.maxTemp)}°</strong>{" "}
                / {Math.round(day.minTemp)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;