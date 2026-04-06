import { checkResponse } from "./api";

/**
 * Fetches weather data and uses checkResponse to validate the result.
 */
export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://openweathermap.org{latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then(checkResponse); 
};

/**
 * Processes raw data. Added optional chaining to prevent errors 
 * if parts of the data object are missing.
 */
export const filterWeatherData = (data) => {
  if (!data || !data.main) return null;

  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  
  // Using optional chaining and fallback for safety
  result.condition = data.weather?.[0]?.main?.toLowerCase() || "unknown";
  result.isDay = isDay(data.sys || {}, Date.now());
  
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  if (!sunrise || !sunset) return true; 
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
