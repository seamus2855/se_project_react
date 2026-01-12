import React from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  // Safely extract values
  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const type = weatherData?.type ?? "clear";

  // Pull the correct image from weatherOptions if weatherData doesn't include one
  const weatherImage =
    weatherData?.weatherImage || weatherOptions[type]?.url || "";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>

      {weatherImage && (
        <img src={weatherImage} alt={type} className="weather-card__image" />
      )}
    </section>
  );
}

export default WeatherCard;
