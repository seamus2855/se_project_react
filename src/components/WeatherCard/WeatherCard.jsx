import React from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  // Access the context for temperature unit (F or C)
  const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

  // Fallback values to prevent crashes if weatherData is undefined
  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const type = weatherData?.type || "clear";
  const weatherImage = weatherData?.weatherImage || "";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
      {weatherImage && (
        <img 
          src={weatherImage} 
          alt={type} 
          className="weather-card__image" 
        />
      )}
    </section>
  );
}

export default WeatherCard;
