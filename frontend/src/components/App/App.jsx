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

// ... (imports remain the same)

const App = () => {
  // --- STATE DECLARATIONS ---
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  // Weather and Temperature State
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // --- HANDLERS ---
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => setActiveModal("");

  // Placeholders for your API logic
  const handleAddItemSubmit = (item) => {
    setIsLoading(true);
    addCard(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  // ... inside your App component ...

  const handleRegistration = (data) => {
    setIsLoading(true);
    auth
      .register(data)
      .then(() => {
        // After successful registration, log them in automatically
        handleAuthorization({ email: data.email, password: data.password });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAuthorization = (data) => {
    setIsLoading(true);
    auth
      .authorize(data.email, data.password)
      .then((res) => {
        // 1. Save the token
        localStorage.setItem("jwt", res.token);
        // 2. Set the login state
        setIsLoggedIn(true);
        // 3. You should ideally fetch the user info here or in a useEffect
        // setCurrentUser(res.user);

        // 4. Close the modal!
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // ...
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    auth
      .updateUser(data.name, data.avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const handleDeleteItem = (card) => {
    removeCard(card._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    (!isLiked ? addCardLike(id, token) : removeCardLike(id, token))
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Fetch initial data
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res); // Assuming res contains user data
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

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
            onRegisterClick={handleRegisterClick} // This MUST match the prop name in RegisterModal
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
