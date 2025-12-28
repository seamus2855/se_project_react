import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const temp = weatherData?.temp?.F;
  const city = weatherData?.city || "your area";
  const type = weatherData?.type || "cold";

  return (
    <section className="weather-card">
      <div className="weather-card__content">
        <h2 className="weather-card__title">Weather</h2>

        <p className="weather-card__temp">
          {temp}°F
        </p>

        <p className="weather-card__city">
          {city}
        </p>

        <p className="weather-card__type">
          Condition: {type}
        </p>
      </div>
    </section>
  );
}

export default WeatherCard;

