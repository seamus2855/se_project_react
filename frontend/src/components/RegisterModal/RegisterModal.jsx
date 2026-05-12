import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, handleRegistration, onClose, onLoginClick, isLoading }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      /* FIX: Move the button to the secondaryButton prop */
      secondaryButton={
        <button
          type="button"
          className="modal__redirect-button"
          onClick={onLoginClick}
        >
          or Log in
        </button>
      }
    >
      <label className="modal__label">
        Email*
        <input
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          name="avatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
