import React, { useContext, useState, useEffect } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, onCloseModal, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const [isConfirming, setIsConfirming] = useState(false);

  // Use the custom hook for Escape and Overlay clicks
  useModalClose(isOpen, onCloseModal);

  useEffect(() => {
    if (!isOpen) {
      setIsConfirming(false);
    }
  }, [isOpen]);

  const isOwn = card?.owner === currentUser?._id;

  if (!isOpen || !card) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button 
          className="modal__close" 
          type="button" 
          onClick={onCloseModal} 
          aria-label="Close"
        />
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__caption">
            <h2 className="modal__caption-text">{card.name}</h2>
            <p className="modal__weather-text">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <div className="modal__delete-container">
              {!isConfirming ? (
                <button
                  className="modal__delete-btn"
                  type="button"
                  onClick={() => setIsConfirming(true)}
                >
                  Delete item
                </button>
              ) : (
                <div className="modal__confirm-group">
                  <span className="modal__confirm-text">Are you sure?</span>
                  <button
                    className="modal__confirm-btn"
                    type="button"
                    onClick={() => onDeleteItem(card)}
                  >
                    Yes, delete
                  </button>
                  <button
                    className="modal__cancel-btn"
                    type="button"
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
