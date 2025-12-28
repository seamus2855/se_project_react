import React, { useState, useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, buttonText, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass values back to App.jsx
    onSubmit(name, imageUrl, weather);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>

        <h3 className="modal__title">{title}</h3>

        <form className="modal__form" onSubmit={handleSubmit}>
          {/* Name */}
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              id="name"
              className="modal__input"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          {/* Image URL */}
          <label htmlFor="imageUrl" className="modal__label">
            Image URL
            <input
              type="url"
              id="imageUrl"
              className="modal__input"
              placeholder="Image URL"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>

          {/* Weather Type */}
          <fieldset className="modal__radio-image-buttons">
            <legend className="modal__legend">Select weather type:</legend>

            <label className="modal__label modal__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="hot"
                checked={weather === "hot"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Hot
            </label>

            <label className="modal__label modal__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="warm"
                checked={weather === "warm"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Warm
            </label>

            <label className="modal__label modal__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="cold"
                checked={weather === "cold"}
                onChange={(e) => setWeather(e.target.value)}
              />
              Cold
            </label>
          </fieldset>

          {/* Submit Button */}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
