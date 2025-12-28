import React from "react";
import "./Footer.css";

function Footer({ weatherData }) {
  const temp = weatherData?.temp?.F;
  const city = weatherData?.city || "your area";

  const getSuggestion = (t) => {
    if (t == null) return "Have a great day!";
    if (t > 80) return "Stay hydrated!";
    if (t < 40) return "Wear a warm jacket!";
    if (t >= 60 && t <= 80) return "Perfect weather to be outside!";
    if (t >= 40 && t < 60) return "A light jacket should be enough.";
    return "Have a great day!";
  };

  const suggestion = getSuggestion(temp);

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__weather">
          Weather: {temp}°F in {city}
        </p>
        <p className="footer__suggestion">Suggestion: {suggestion}</p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} WTWR — What To Wear Today
        </p>
      </div>
    </footer>
  );
}

export default Footer;
