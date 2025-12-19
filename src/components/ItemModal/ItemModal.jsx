import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  // Close modal when clicking outside (on overlay)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal on Escape key
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Add/remove escape key listener
  React.useEffect(() => {
    if (activeModal === "preview") {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [activeModal]);

  if (activeModal !== "preview" || !card) {
    return null;
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
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
      </div>
    </div>
  );
}

export default ItemModal;
