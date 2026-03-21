import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import "./Header.css";

const Header = ({ handleAddClick, onRegisterClick, onLoginClick, weatherData, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  // Helper to get first letter for placeholder
  const userLetter = currentUser?.name?.charAt(0).toUpperCase() || "";

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {new Date().toLocaleString('default', { month: 'long', day: 'numeric' })}, {weatherData.city}
        </p>
      </div>

      <div className="header__nav">
        {isLoggedIn ? (
          <>
            <button className="header__add-btn" onClick={handleAddClick}>
              + Add clothes
            </button>
            <Link to="/profile" className="header__user-container">
              <p className="header__user-name">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="avatar" className="header__avatar" />
              ) : (
                <div className="header__avatar-placeholder">{userLetter}</div>
              )}
            </Link>
          </>
        ) : (
          <div className="header__auth-container">
            <button className="header__auth-btn" onClick={onRegisterClick}>Sign Up</button>
            <button className="header__auth-btn" onClick={onLoginClick}>Log In</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
