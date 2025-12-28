import "./App.css";

import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: "--" },
    city: "",
    weatherImage: null,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  // Open preview modal
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // Open add-garment modal
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleAddItemSubmit = (name, imageUrl, weather) => {
  const newItem = {
    _id: Date.now(), // temporary unique ID
    name,
    weather,
    imageUrl,
  };

  setClothingItems((prev) => [newItem, ...prev]);
  closeActiveModal();
};


  // Close any modal
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  // Close modal on ESC
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // Fetch weather on mount
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
        />

        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />

        <Footer weatherData={weatherData} />
      </div>

      {/* Add Garment Modal */}
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            required
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>

        <fieldset className="modal__radio-image-buttons">
          <legend className="modal__legend">Select weather type:</legend>

          <label className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" value="hot" />
            Hot
          </label>

          <label className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" value="warm" />
            Warm
          </label>

          <label className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" value="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      {/* Preview Modal */}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
