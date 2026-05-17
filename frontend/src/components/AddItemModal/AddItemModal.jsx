import React, { useEffect } from "react"; 
import { useForm } from "../../hooks/useForm"; 
import ModalWithForm from "../ModalWithForm/ModalWithForm"; 
import './AddItemModal.css'; 

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, isLoading }) => { 
  // FIX: Changed state property tracking key from 'imageUrl' to 'link' 
  // to align directly with the project guidelines and API payload naming expectations.
  const { values, handleChange, setValues } = useForm({ 
    name: "", 
    link: "", 
    weather: "", 
  }); 

  useEffect(() => { 
    if (isOpen) { 
      setValues({ name: "", link: "", weather: "" }); 
    } 
  }, [isOpen, setValues]); 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onAddItem(values); 
  }; 

  return ( 
    <ModalWithForm 
      title="New garment" 
      buttonText={isLoading ? "Saving..." : "Add garment"} 
      isOpen={isOpen} 
      onClose={onCloseModal} 
      onSubmit={handleSubmit} 
      name="add-garment" 
    > 
      <label className="modal__label"> 
        Name 
        <input 
          type="text" 
          className="modal__input" 
          name="name" 
          placeholder="Name" 
          value={values.name} 
          onChange={handleChange} 
          required 
          minLength="2"
          maxLength="30"
        /> 
      </label> 
      <label className="modal__label"> 
        Image 
        <input 
          type="url" 
          className="modal__input" 
          name="link" // FIX: Must be "link" to bind with useForm's values.link variable properly
          placeholder="Image URL" 
          value={values.link} 
          onChange={handleChange} 
          required 
        /> 
      </label> 
      <fieldset className="modal__fieldset"> 
        <legend className="modal__legend">Select the weather type:</legend> 
        <div className="modal__radio-buttons"> 
          <label className="modal__label_type_radio"> 
            <input 
              type="radio" 
              name="weather" 
              className="modal__radio-input" 
              value="hot" 
              checked={values.weather === "hot"} 
              onChange={handleChange} 
              required 
            /> 
            <span className="modal__radio-text">Hot</span> 
          </label> 
          <label className="modal__label_type_radio"> 
            <input 
              type="radio" 
              name="weather" 
              className="modal__radio-input" 
              value="warm" 
              checked={values.weather === "warm"} 
              onChange={handleChange} 
            /> 
            <span className="modal__radio-text">Warm</span> 
          </label> 
          <label className="modal__label_type_radio"> 
            <input 
              type="radio" 
              name="weather" 
              className="modal__radio-input" 
              value="cold" 
              checked={values.weather === "cold"} 
              onChange={handleChange} 
            /> 
            <span className="modal__radio-text">Cold</span> 
          </label> 
        </div> 
      </fieldset> 
    </ModalWithForm> 
  ); 
}; 

export default AddItemModal;
