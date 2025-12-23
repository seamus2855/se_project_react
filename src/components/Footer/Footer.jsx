import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [weather, setWeather] = useState("Loading...");
  const [suggestion, setSuggestion] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        // Fetch weather data from Open-Meteo (free, no API key needed)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
        );

        const data = await response.json();
        const temp = Math.round(data.current.temperature_2m);
        const weatherCode = data.current.weather_code;

        // Map weather codes to descriptions
        const weatherDesc = getWeatherDescription(weatherCode);
        setWeather(`${temp}°F, ${weatherDesc}`);

        // Set suggestion based on weather
        setSuggestion(getWeatherSuggestion(weatherCode, temp));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather("Unable to fetch weather");
        setSuggestion("Check the weather app!");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 49) return "Foggy";
    if (code <= 69) return "Rainy";
    if (code <= 79) return "Snowy";
    if (code <= 99) return "Stormy";
    return "Unknown";
  };

  const getWeatherSuggestion = (code, temp) => {
    if (code >= 51 && code <= 69) return "Don't forget your umbrella! ☔";
    if (code >= 71 && code <= 79) return "Bundle up, it's snowing! ❄️";
    if (code >= 95) return "Stay indoors, storm ahead! ⚡";
    if (temp > 80) return "Stay hydrated! 💧";
    if (temp < 40) return "Wear a jacket! 🧥";
    if (code === 0) return "Perfect day to go outside! ☀️";
    return "Have a great day!";
  };

  return (
    <footer>
      <p>Weather: {weather}</p>
      <p>Suggestion: {suggestion}</p>
    </footer>
  );
};

export default Footer;
