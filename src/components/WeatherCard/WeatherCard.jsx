import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const temp = weatherData?.temp?.F ?? "--";
  const city = weatherData?.city || "your area";
  const type = weatherData?.type || "clear";
  const weatherImage = weatherData?.weatherImage; // passed from App

  return (
    <section className="weather-card">
      {weatherImage && (
        <img
          src={weatherImage}
          alt={type}
          className="weather-card__image"
        />
      )}

      <p className="weather-card__temp">{temp}°F</p>
    </section>
  );
}

export default WeatherCard;
