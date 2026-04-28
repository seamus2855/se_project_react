import React from "react";
import "./ModalWithForm.css";
import useForm from "../../hooks"; // Import the custom hook

function ModalWithForm({
  isOpen,
  onClose,
  children,
  title,
  buttonText,
  onSubmit,
}) {
  // Use the custom hook for Escape key and Overlay clicks
  useModalClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
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
          {/* 
            Wrapped in a container to align the primary button 
            and the redirect button side-by-side per design.
          */}
          <div className="modal__submit-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
