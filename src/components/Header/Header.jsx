import React from "react";
import "./Header.css";

function Header({ handleAddClick, weatherData }) {
  const temp = weatherData?.temp?.F ?? "--";
  const city = weatherData?.city || "";

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">WTWR — What To Wear</h1>

        <span className="header__date">
          {new Date().toLocaleString("default", {
            month: "long",
            day: "numeric",
          })}
        </span>

        <p className="header__username">Terrence Tegegne</p>

        {/* Avatar */}
        <div className="header__avatar">TT</div>

        <div className="header__weather">
          <span className="header__temp">{temp}°F</span>
          {city && <span className="header__city">in {city}</span>}
        </div>

        <button
          type="button"
          className="header__add-button"
          onClick={handleAddClick}
        >
          + Add garment
        </button>
      </div>
    </header>
  );
}

export default Header;
