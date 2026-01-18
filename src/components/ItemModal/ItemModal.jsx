import React from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, onCloseModal, card, onDeleteItem }) {
  if (!isOpen || !card) return null;

  return (
    <div className="modal">
      <div className="modal__content">

        <button className="modal__close" onClick={onCloseModal}>
          ×
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image"
        />

        <div className="modal__info">
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {/* DELETE BUTTON — per Figma */}
          <button
            className="modal__delete-button"
            onClick={() => onDeleteItem(card)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
