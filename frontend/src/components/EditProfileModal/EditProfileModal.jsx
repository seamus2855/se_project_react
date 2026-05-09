import React, { useEffect, useContext } from "react";
// 1. Correct import for your custom useForm hook (adjust path as needed)
import { useForm } from "../../hooks/useForm"; 
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onUpdateUser, onCloseModal, isLoading }) => {
  // 2. Properly destructure currentUser from context
  const { currentUser } = useContext(CurrentUserContext);

  // 3. Initialize useForm with the correct initial state object
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // 4. Use setValues from useForm to populate fields when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the consolidated values object to your update function
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      name="edit-profile"
    >
      <label className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          // 5. Bind value and onChange to the hook's state
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          // 6. Bind value and onChange to the hook's state
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
