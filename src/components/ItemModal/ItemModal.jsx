import React, { useContext } from "react"; // Import useContext
import "./ItemModal.css";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext"; // Import the context

function ItemModal({ isOpen, onCloseModal, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext); // Subscribe to context

  // Check if the current user is the owner of the item
  const isOwn = card?.owner === currentUser?._id;

  if (!isOpen || !card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onCloseModal}>
          ×
        </button>

        <img
          src={card.imageUrl || card.link || ""}
          alt={card.name || "Item preview"}
          className="modal__image"
        />

        <div className="modal__info">
          <div className="modal__text-container">
            <h2 className="modal__title">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {/* Render Delete button ONLY if the user owns the item */}
          {isOwn && (
            <button
              className="modal__delete-button"
              onClick={() => onDeleteItem(card)}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
