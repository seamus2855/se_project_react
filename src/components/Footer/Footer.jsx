import React from "react";
import "./Footer.css";

const Footer = ({ weatherData }) => {
  const getWeatherSuggestion = (temp, city) => {
    if (!temp) return "Have a great day!";
    
    if (temp > 80) return "Stay hydrated! 💧";
    if (temp < 40) return "Wear a jacket! 🧥";
    if (temp >= 60 && temp <= 80) return "Perfect day to go outside! ☀️";
    if (temp >= 40 && temp < 60) return "Light jacket recommended! 🧥";
    
    return "Have a great day!";
  };

  // Handle case when weatherData is not yet loaded
  if (!weatherData || !weatherData.temp) {
    return (
      <footer>
        <p>Weather: Loading...</p>
        <p>Suggestion: Loading...</p>
      </footer>
    );
  }

  const temperature = Math.round(weatherData.temp.F);
  const suggestion = getWeatherSuggestion(temperature, weatherData.city);

  return (
    <footer>
      <p>Weather: {temperature}°F in {weatherData.city}</p>
      <p>Suggestion: {suggestion}</p>
    </footer>
  );
};

export default Footer;
