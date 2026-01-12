import { useEffect } from 'react';
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
  });

// Reset when modal opens
// Reset when modal opens
useEffect(() => {
  if (isOpen) {
    setValues({ name: "", imageUrl: "", weather: "" });
  }
}, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values.name, values.imageUrl, values.weather);
  };

  const handleClose = () => {
    setValues({ name: "", imageUrl: "", weather: "" });
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <legend className="modal__legend">Select weather type:</legend>

      <label htmlFor="hot" className="modal__label modal__label_type_radio">
        <input
          type="radio"
          name="weather"
          id="hot"
          value="hot"
          checked={values.weather === "hot"}
          onChange={handleChange}
          required
        />
        Hot
      </label>

      <label htmlFor="warm" className="modal__label modal__label_type_radio">
        <input
          type="radio"
          name="weather"
          id="warm"
          value="warm"
          checked={values.weather === "warm"}
          onChange={handleChange}
        />
        Warm
      </label>

      <label htmlFor="cold" className="modal__label modal__label_type_radio">
        <input
          type="radio"
          name="weather"
          id="cold"
          value="cold"
          checked={values.weather === "cold"}
          onChange={handleChange}
        />
        Cold
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
