import React from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext,
  );

  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const type = weatherData?.type || "clear";
  const isDay = weatherData?.isDay ?? true;

  const weatherOption = weatherOptions.find((option) => {
    return option.condition === type && option.day === isDay;
  });

  // 1. Check for custom data, 2. Check constants, 3. Fallback to a hardcoded default URL
  const weatherImage = 
    weatherData?.weatherImage || 
    weatherOption?.url || 
    "https://practicum-content.s3.us-west-1.amazonaws.com"; 

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
      {/* Removed the conditional {weatherImage && ...} check */}
      <img
        src={weatherImage}
        alt={`Weather condition: ${type}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
