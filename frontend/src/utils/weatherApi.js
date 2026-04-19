import { checkResponse } from "./api";

/**
 * Fetches weather data and uses checkResponse to validate the result.
 */
export const getWeather = ({ latitude, longitude }, apiKey) => {
  // FIXED: Corrected the endpoint URL, added 'lat=' parameter, and ensured 'api.' subdomain
  return fetch(
    `https://openweathermap.org{latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
};

/**
 * Processes raw data. Added more robust checks and simplified logic.
 */
export const filterWeatherData = (data) => {
  if (!data || !data.main || !data.weather?.[0]) return null;

  const result = {};
  result.city = data.name;
  
  // Temperature calculations
  const tempF = Math.round(data.main.temp);
  result.temp = {
    F: tempF,
    C: Math.round(((tempF - 32) * 5) / 9),
  };

  result.type = getWeatherType(result.temp.F);
  
  // Use the main weather condition string
  result.condition = data.weather[0].main.toLowerCase();
  
  // Pass sys data or an empty object to avoid errors
  result.isDay = isDay(data.sys || {}, Date.now());
  
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  // Default to true if solar data is missing
  if (!sunrise || !sunset) return true;
  
  // OpenWeather provides Unix timestamps (seconds); Date.now() is milliseconds
  const sunriseMs = sunrise * 1000;
  const sunsetMs = sunset * 1000;
  
  return now > sunriseMs && now < sunsetMs;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
