import React from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const temp = weatherData?.temp?.F ?? "--";
  const city = weatherData?.city || "your area";

  const dateString = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__weather-header">
          <span className="header__date">{dateString}</span>
          <span className="header__location">in {city}</span>
          <span className="header__temp-large">{temp}°F</span>
        </div>

        <h1 className="header__logo">WTWR — What To Wear</h1>

        <p className="header__username">Terrence Tegegne</p>

        <NavLink to="/profile" className="header__avatar-link">
          <div className="header__avatar">TT</div>
        </NavLink>

        <button
          type="button"
          className="header__add-button"
          onClick={handleAddClick}
        >
          <ToggleSwitch />
          + Add Clothes
        </button>
      </div>
    </header>
  );
}

export default Header;
