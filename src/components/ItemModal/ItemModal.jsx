import React from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";

function ItemModal({ activeModal, onClose, card }) {
  // Only render when preview modal is active
  if (activeModal !== "preview" || !card) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal modal_type_image" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" />
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image"
        />

        <p className="modal__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ItemModal;
