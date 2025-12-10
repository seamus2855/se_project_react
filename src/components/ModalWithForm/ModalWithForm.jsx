import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, children, title, buttonText }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        >
          CLOSE
        </button>
        <form className="modal__form">
          {children}
          <h2 className="modal__title">{title}</h2>
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
