import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [weather, setWeather] = useState("unknown");
  const [suggestion, setSuggestion] = useState("Just wing it.");

  return (
    <footer>
      <p>Weather: {weather}</p>
      <p>Suggestion: {suggestion}</p>
    </footer>
  );
};

export default Footer;
