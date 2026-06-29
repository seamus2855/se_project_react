import "./App.css"; 
import { Routes, Route, Navigate } from "react-router-dom"; 
import { useEffect, useState } from "react"; 

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

  const handleAddItemSubmit = (item) => { 
    setIsLoading(true); 
    const token = localStorage.getItem("jwt");
    
    addCard(item, token) 
      .then((newItem) => { 
        const cardToAdd = newItem.data || newItem;
        setClothingItems([cardToAdd, ...clothingItems]); 
        closeActiveModal(); 
      }) 
      .catch(console.error) 
      .finally(() => setIsLoading(false)); 
  }; 

  const handleRegistration = (data) => { 
    setIsLoading(true); 
    auth 
      .register(data) 
      .then(() => { 
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
        localStorage.setItem("jwt", res.token); 
        setIsLoggedIn(true); 
        
        if (res.user) {
          setCurrentUser(res.user);
        } else {
          auth.checkToken(res.token).then((user) => setCurrentUser(user));
        }
        
        closeActiveModal(); 
      }) 
      .catch(console.error) 
      .finally(() => setIsLoading(false)); 
  }; 

  const handleUpdateUser = (data) => { 
    setIsLoading(true); 
    const token = localStorage.getItem("jwt");
    
    auth 
      .updateUser(data.name, data.avatar, token) 
      .then((updatedUser) => { 
        setCurrentUser(updatedUser.data || updatedUser); 
        closeActiveModal(); 
      }) 
      .catch(console.error) 
      .finally(() => setIsLoading(false)); 
  }; 

  const handleDeleteItem = (card) => { 
    const token = localStorage.getItem("jwt");
    removeCard(card._id, token) 
      .then(() => { 
        setClothingItems((items) => items.filter((item) => item._id !== card._id)); 
        closeActiveModal(); 
      }) 
      .catch(console.error); 
  }; 

  const handleCardLike = ({ id, isLiked }) => { 
    const token = localStorage.getItem("jwt"); 
    (!isLiked ? addCardLike(id, token) : removeCardLike(id, token)) 
      .then((updatedCard) => { 
        const savedCard = updatedCard.data || updatedCard;
        setClothingItems((cards) => 
          cards.map((item) => (item._id === id ? savedCard : item))
        ); 
      }) 
      .catch(console.error); 
  }; 

  const handleLogout = () => { 
    localStorage.removeItem("jwt"); 
    setIsLoggedIn(false); 
    setCurrentUser(null); 
  }; 

  // Fetch initial Weather data 
  useEffect(() => { 
    getWeather(coordinates, APIKey) 
      .then((data) => { 
        const filteredData = filterWeatherData(data); 
        setWeatherData(filteredData); 
      }) 
      .catch(console.error); 
  }, []); 

  // Populate clothing items array upon loading
  useEffect(() => {
    getItems()
      .then((res) => {
        const items = res.data || res;
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  // Hydrate user session tokens on mount
  useEffect(() => { 
    const jwt = localStorage.getItem("jwt"); 
    if (jwt) { 
      auth 
        .checkToken(jwt)
        .then((res) => { 
          setIsLoggedIn(true); 
          setCurrentUser(res.data || res); 
        }) 
        .catch((err) => { 
          console.error("Token validation failed:", err); 
          localStorage.removeItem("jwt"); 
        }); 
    } 
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
            onRegisterClick={handleRegisterClick} 
            isLoading={isLoading} 
          /> 
        </div> 
      </CurrentTemperatureUnitContext.Provider> 
    </CurrentUserContext.Provider> 
  ); 
}; 

export default App;
