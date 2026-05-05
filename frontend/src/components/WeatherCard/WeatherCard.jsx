import React from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  // Access context properly
  const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

  // Use optional chaining and logical ORs for fallbacks
  // If temp is missing, display "--"
  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const type = weatherData?.type || "clear";
  const isDay = weatherData?.isDay ?? true;

  // Find the matching weather option based on condition and time of day
  const weatherOption = weatherOptions.find((option) => {
    return option.condition === type && option.isDay === isDay;
  });

  // Determine image source: custom data > constants > fallback URL
  const weatherImage = 
    weatherData?.weatherImage || 
    weatherOption?.url || 
    "https://amazonaws.com";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
      <img 
        src={weatherImage} 
        alt={`Weather condition: ${type}`} 
        className="weather-card__image" 
      />
    </section>
  );
}

export default WeatherCard;
