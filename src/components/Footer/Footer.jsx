import { useState, useEffect } from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by [ Seamus Ryan]</p>
      <p className="footer__year">2025</p>
    </footer>
  );
}

const Footer = () => {
  const [weather, setWeather] = useState("unknown");
  const [suggestion, setSuggestion] = useState("Just wing it.");

  useEffect(() => {
    const fetchWeather = async () => {
      // Simulate fetching from a weather API
      const randomTemp = Math.random() * 100;
      const condition = randomTemp > 70 ? "sunny" : "cold";
      setWeather(condition);
      // ... more weather logic
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      // Simulate fetching from a weather API
      const randomTemp = Math.random() * 100; // 0-100 degrees
      const condition = randomTemp > 70 ? "sunny" : "cold";
      setWeather(condition);
      setSuggestion(getOutfitSuggestion(condition));
    };
    fetchWeather();
  }, []);

  const getOutfitSuggestion = (weatherCondition) => {
    switch (weatherCondition) {
      case "sunny":
        return "Shorts and a T-shirt";
      case "cold":
        return "Jacket and jeans";
      default:
        return "Just wing it. Your guess is as good as ours.";
    }
  };

  return (
    <footer className="wtwr-footer">
      <div className="footer-content">
        <p>Today's WTWR Methodology:</p>
        <p>Weather: {weather}</p>
        <p>Suggestion: {suggestion}</p>
      </div>
    </footer>
  );
};

export default Footer;
