import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

// Components & Contexts
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Utils & API
import * as auth from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
import {
  getItems,
  addCard,
  removeCard,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";

// ... (all your imports remain the same)

const App = () => {
  // 1. ADD THE MISSING STATE DECLARATION HERE
  const [currentUser, setCurrentUser] = useState(null); 
  
  // (Keep your existing states and handlers, e.g.,)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  // ... rest of your state

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CurrentTemperatureUnitContext.Provider 
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header 
              handleAddClick={handleAddClick} 
              onRegisterClick={handleRegisterClick} 
              onLoginClick={handleLoginClick} 
              isLoggedIn={isLoggedIn} 
              weatherData={weatherData} 
            />
            <Routes>
              <Route path="/" element={
                <Main 
                  weatherData={weatherData} 
                  onCardClick={handleCardClick} 
                  clothingItems={clothingItems} 
                  onCardLike={handleCardLike} 
                />
              } />
              <Route path="/profile" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile 
                    clothingItems={clothingItems} 
                    onAddClick={handleAddClick} 
                    onCardClick={handleCardClick} 
                    onCardLike={handleCardLike} 
                    onLogout={handleLogout} 
                    onEditProfileClick={handleEditProfileClick} 
                  />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </div>

          <AddItemModal 
            isOpen={activeModal === "add-garment"} 
            onCloseModal={closeActiveModal} 
            onAddItem={handleAddItemSubmit} 
            isLoading={isLoading} 
          />
          <ItemModal 
            isOpen={activeModal === "preview"} 
            card={selectedCard} 
            onCloseModal={closeActiveModal} 
            onDeleteItem={handleDeleteItem} 
          />
          <EditProfileModal 
            isOpen={activeModal === "edit-profile"} 
            onUpdateUser={handleUpdateUser} 
            onCloseModal={closeActiveModal} 
            isLoading={isLoading} 
          />
          <RegisterModal 
            isOpen={activeModal === "register"} 
            handleRegistration={handleRegistration} 
            onClose={closeActiveModal} 
            onLoginClick={handleLoginClick} 
            isLoading={isLoading} 
          />
          <LoginModal 
            isOpen={activeModal === "login"} 
            onLogin={handleAuthorization} 
            onCloseModal={closeActiveModal} 
            onRegisterClick={handleRegisterClick} 
            isLoading={isLoading} 
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
