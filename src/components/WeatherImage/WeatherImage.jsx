import React from "react";
import "./WeatherImage.css";  // This connects the CSS to this component


export default function WeatherImage() {
  // Hardcoded fallback image — replace with your own asset
  const fallbackImage =
    "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=600&q=60";

  return (
    <div className="weather-image-wrapper">
      <img
        src={fallbackImage}
        alt="Weather"
        className="weather-image"
      />
    </div>
  );
}
