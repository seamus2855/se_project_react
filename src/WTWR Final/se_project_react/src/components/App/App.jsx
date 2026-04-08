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
import { getItems, addCard, removeCard, addCardLike, removeCardLike } from "../../utils/api";

const App = () => {
  const navigate = useNavigate();

  // --- State ---
  const [weatherData, setWeatherData] = useState({
    type: "cold", temp: { F: 999, C: 999 }, city: "", weatherImage: "", condition: "", isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- Modal Handlers ---
  const closeActiveModal = useCallback(() => {
    setActiveModal("");
    // Delay clearing selectedCard to allow modal close animations to finish
    setTimeout(() => setSelectedCard(null), 300);
  }, []);

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // --- Universal Submit Helper ---
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // --- Auth Handlers ---
  const handleLogout = useCallback(() => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  }, [navigate]);

  const handleAuthorization = (email, password) => {
    const makeRequest = () => {
      return auth.authorize(email, password).then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user || data); // Optimization: Use user data from login response
          navigate("/profile");
        }
      });
    };
    handleSubmit(makeRequest);
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    const makeRequest = () => {
      return auth.register(name, avatar, email, password).then(() => {
        return handleAuthorization(email, password); // Log in immediately after registration
      });
    };
    handleSubmit(makeRequest);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return auth.updateUser(name, avatar, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
    };
    handleSubmit(makeRequest);
  };

  // --- API Handlers ---
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const request = !isLiked ? addCardLike(id, token) : removeCardLike(id, token);
    request
      .then((updatedCard) => {
        const newCard = updatedCard.data || updatedCard;
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? newCard : item))
        );
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return addCard({ name, imageUrl, weather }, token).then((newItem) => {
        setClothingItems((prev) => [newItem.data || newItem, ...prev]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteItem = (card) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return removeCard(card._id, token).then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== card._id));
      });
    };
    handleSubmit(makeRequest);
  };

  // --- Initial Data Loading ---
  useEffect(() => {
    // 1. Fetch public data
    getWeather(coordinates, APIKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);

    // 2. Validate token if it exists
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error("Token invalid:", err);
          handleLogout(); // Clear stale tokens
        });
    }
  }, [handleLogout]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
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
              <Route path="/" element={<Main weatherData={weatherData} onCardClick={handleCardClick} clothingItems={clothingItems} onCardLike={handleCardLike} />} />
              <Route path="/profile" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile clothingItems={clothingItems} onAddClick={handleAddClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onLogout={handleLogout} onEditProfileClick={handleEditProfileClick} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </div>

          <AddItemModal isOpen={activeModal === "add-garment"} onCloseModal={closeActiveModal} onAddItem={handleAddItemSubmit} isLoading={isLoading} />
          <ItemModal isOpen={activeModal === "preview"} card={selectedCard} onCloseModal={closeActiveModal} onDeleteItem={handleDeleteItem} />
          <EditProfileModal isOpen={activeModal === "edit-profile"} onUpdateUser={handleUpdateUser} onCloseModal={closeActiveModal} isLoading={isLoading} />
          <RegisterModal isOpen={activeModal === "register"} onRegister={handleRegistration} onCloseModal={closeActiveModal} onLoginClick={handleLoginClick} isLoading={isLoading} />
          <LoginModal isOpen={activeModal === "login"} onLogin={handleAuthorization} onCloseModal={closeActiveModal} onRegisterClick={handleRegisterClick} isLoading={isLoading} />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
