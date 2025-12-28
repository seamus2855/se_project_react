import "./ItemModal.css";
import React, { useEffect } from "react";
function ItemModal({ activeModal, onClose, card }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (activeModal === "preview") {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal, onClose]);

  if (activeModal !== "preview" || !card) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <img
          className="modal__image"
          src={card.link || card.imageUrl}
          alt={card.name}
        />

        <div className="modal__details">
          <h2 className="modal__name">{card.name}</h2>

          {card.weather && (
            <p className="modal__weather">Weather: {card.weather}</p>
          )}

          {card.description && (
            <p className="modal__description">{card.description}</p>
          )}

          {card.temperature && (
            <p className="modal__temperature">
              Temperature: {card.temperature}°F
            </p>
          )}
        </div>

        <div className="modal__footer">
          <div className="modal__footer">
            <button
              className="modal__footer-btn modal__footer-btn_type_secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button className="modal__footer-btn modal__footer-btn_type_primary">
              Add to Outfit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
