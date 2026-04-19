import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ isOpen, onLogin, onCloseModal, onRegisterClick }) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  // Reset fields when the modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      name="login"
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      
      {/* Grouping buttons: The submit button is typically inside ModalWithForm,
          so this secondary button appears immediately after it. */}
      <button 
        type="button" 
        className="modal__redirect-button" 
        onClick={onRegisterClick}
      >
        or Register
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
