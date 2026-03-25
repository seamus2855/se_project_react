import React, { useContext, useState, useEffect } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onCloseModal, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const [isConfirming, setIsConfirming] = useState(false);

  // Reset confirmation state whenever the modal closes or a new card is selected
  useEffect(() => {
    if (!isOpen) {
      setIsConfirming(false);
    }
  }, [isOpen]);

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

          {/* Render Delete button OR Confirmation prompt ONLY if the user owns the item */}
          {isOwn && (
            <div className="modal__delete-container">
              {!isConfirming ? (
                <button
                  className="modal__delete-button"
                  onClick={() => setIsConfirming(true)}
                >
                  Delete Item
                </button>
              ) : (
                <div className="modal__confirm-delete">
                  <p className="modal__confirm-text">Are you sure?</p>
                  <button
                    className="modal__confirm-button"
                    onClick={() => onDeleteItem(card)}
                  >
                    Yes, delete item
                  </button>
                  <button
                    className="modal__cancel-button"
                    onClick={() => setIsConfirming(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
