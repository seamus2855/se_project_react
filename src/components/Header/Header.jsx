import React from "react";
import "./Header.css";

function Header({ handleAddClick, weatherData }) {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">WTWR — What To Wear</h1>

        <div className="header__weather">
          <span className="header__temp">{weatherData?.temp?.F}°F</span>
          {weatherData?.city && (
            <span className="header__city">in {weatherData.city}</span>
          )}
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
