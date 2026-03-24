import React from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  // Fallback to "clear" if type is missing
  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const type = weatherData?.type || "clear";
  const isDay = weatherData?.isDay ?? true;

  // Find the matching option or fallback to a default
  const weatherOption = weatherOptions.find((option) => {
    return option.condition === type && option.day === isDay;
  });

  // Priority: 1. Custom Image, 2. Constant URL, 3. Empty String
  const weatherImage = weatherData?.weatherImage || weatherOption?.url || "";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
      {weatherImage && (
        <img 
          src={weatherImage} 
          alt={`Weather condition: ${type}`} 
          className="weather-card__image" 
        />
      )}
    </section>
  );
}

export default WeatherCard;
