import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, children, title, buttonText, onSubmit }) {
  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        >
          ×
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
