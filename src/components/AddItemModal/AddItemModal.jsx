import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  };

  const handleClose = () => {
    setName("");
    setImageUrl("");
    setWeather("");
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>

      <legend className="modal__legend">Select weather type:</legend>

      <label htmlFor="hot" className="modal__label modal__label_type_radio">
        <input
          type="radio"
          name="weather"
          id="hot"
          value="hot"
          checked={weather === "hot"}
          onChange={(e) => setWeather(e.target.value)}
          required
        />
        Hot
      </label>

      <label htmlFor="warm" className="modal__label modal__label_type_radio">
        <input
          type="radio"
          name="weather"
          id="warm"
          value="warm"
          checked={weather === "warm"}
          onChange={(e) => setWeather(e.target.value)}
        />
        Warm
      </label>

      <label htmlFor="cold" className="modal__label modal__label_type_radio">
        <input
          type="radio"
          name="weather"
          id="cold"
          value="cold"
          checked={weather === "cold"}
          onChange={(e) => setWeather(e.target.value)}
        />
        Cold
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
