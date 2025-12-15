import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  // ← Now accepting the prop!
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay && // ← Now this will work
      option.condition === weatherData.condition
    );
  });

  let weatherOptionUrl;
  let weatherOptionCondition;

  if (filteredOptions.length === 0) {
    const defaultOption = weatherData.isDay
      ? defaultWeatherOptions.day
      : defaultWeatherOptions.night;
    weatherOptionUrl = defaultOption?.url?.href;
    weatherOptionCondition = "default";
  } else {
    weatherOptionUrl = filteredOptions[0]?.url?.href;
    weatherOptionCondition = filteredOptions[0]?.condition;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg;F
      </p>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${weatherOptionCondition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
