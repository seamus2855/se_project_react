import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import "./Header.css";

const Header = ({
  handleAddClick,
  onRegisterClick,
  onLoginClick,
  weatherData,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userLetter = currentUser?.name?.charAt(0).toUpperCase() || "";

  // Formatting date to match design: "Month Day" (e.g., "October 10")
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__nav">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__user-section">
            <button
              className="header__add-btn"
              type="button"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__user-container">
              <p className="header__user-name">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{userLetter}</div>
              )}
            </Link>
          </div>
        ) : (
          <div className="header__auth-container">
            <button
              className="header__auth-btn"
              type="button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__auth-btn"
              type="button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
