import React from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext,
  );

  // Safely extract values
  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const type = weatherData?.type ?? "clear";
  const isDay = weatherData?.isDay ?? true;

  // Use .find() to match both condition and day/night status within the array
  const weatherOption = weatherOptions.find((option) => {
    return option.condition === type && option.day === isDay;
  });

  const weatherImage = weatherData?.weatherImage || weatherOption?.url || "";

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
