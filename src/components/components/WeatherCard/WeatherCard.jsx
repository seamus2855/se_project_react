import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/utils/constants";

function WeatherCard() {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOptionUrl;
  let weatherOptionCondition;

  if (filteredOptions.length === 0) {
    weatherOptionUrl = defaultWeatherOptions?.url;
    weatherOptionCondition = defaultWeatherOptions?.condition;
  } else {
    weatherOptionUrl = filteredOptions[0]?.url;
    weatherOptionCondition = filteredOptions[0]?.condition;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">(weatherData.temp.F) &deg: F</p>
      <img
        src="weatherOptionUrl"
        alt={`Card showing ${weatherOptionCondition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
