import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  children,
  title,
  buttonText,
  onSubmit,
  isLoading, // Added to show saving state
}) {
  // Handle Escape key closure
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle Overlay click closure
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__submit-container">
            <button type="submit" className="modal__submit">
              {/* Dynamic button text based on loading state */}
              {isLoading ? "Saving..." : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
