import "./App.css";
// Added useNavigate to the import list below
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

import * as auth from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext"
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  addCard,
  removeCard,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";

const App = () => {
  const navigate = useNavigate(); // Initialized the navigate hook

  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    weatherImage: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // Modal Handlers
  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  // Auth Handlers
  const handleAuthorization = (email, password) => {
    if (!email || !password) return;
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user || data);
          closeActiveModal();
          navigate("/"); // Redirect to main page after successful login
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    return auth
      .register(name, avatar, email, password)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    auth
      .updateUser(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/"); // Redirect to home page on logout
  };

  // LIKING LOGIC
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  // API Handlers
  const handleAddItemSubmit = (name, imageUrl, weather) => {
    const token = localStorage.getItem("jwt");
    addCard({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (card) => {
    const token = localStorage.getItem("jwt");
    removeCard(card._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Check Token on Mount
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    auth
      .checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        handleLogout();
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
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
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <Footer weatherData={weatherData} />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onCloseModal={closeActiveModal}
            onAddItem={handleAddItemSubmit}
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
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onCloseModal={closeActiveModal}
            onLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleAuthorization}
            onCloseModal={closeActiveModal}
            onRegisterClick={handleRegisterClick}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
