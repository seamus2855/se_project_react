import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import { getWeather } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          setweatherData={setWeatherData}
          weatherData={weatherData}
        />
        <Main
          weatherData={weatherData}
          onCardClick={handleCardClick}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
        />
        <Footer />
      </div>
      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" id="hot" value="hot" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" className="modal__radio-input" value="warm" />{" "}
            Warm
          </label>
          <label className="modal__label modal__label_type_radio">
            <input type="radio" className="modal__radio-input" value="cold" />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
