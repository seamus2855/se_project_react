import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setweatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("preview");
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

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} setweatherData={setweatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select weather type:</legend>
          <input id="cold" className="modal__label modal__label_type_radio">
            <input type="radio" className="modal__radio-input" /> Hot
          </input>
          <input id="cold" className="modal__label modal__label_type_radio">
            <input type="radio" className="modal__radio-input" /> Warm
          </input>
          <input id="cold" className="modal__label modal__label_type_radio">
            <input type="radio" className="modal__radio-input" /> Cold
          </input>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} onClose={closeActiveModal} />
    </div>
  );
}

export default App;
