import React from "react";
import "./Footer.css";

const Footer = ({ weatherData }) => {
  const getWeatherSuggestion = (temp) => {
    if (temp == null) return "Have a great day!";

    if (temp > 80) return "Stay hydrated! 💧";
    if (temp < 40) return "Wear a jacket! 🧥";
    if (temp >= 60 && temp <= 80) return "Perfect day to go outside! ☀️";
    if (temp >= 40 && temp < 60) return "Light jacket recommended! 🧥";

    return "Have a great day!";
  };

  // Handle loading or missing weather data
  if (
    !weatherData ||
    !weatherData.temp ||
    weatherData.temp.F == null
  ) {
    return (
      <footer>
        <p>Weather: Loading...</p>
        <p>Suggestion: Loading...</p>
      </footer>
    );
  }

  const temperature = Math.round(weatherData.temp.F);
  const city = weatherData.city || "your area";
  const suggestion = getWeatherSuggestion(temperature);

  return (
    <footer>
      <p>Weather: {temperature}°F in {city}</p>
      <p>Suggestion: {suggestion}</p>
    </footer>
  );
};

export default Footer;
