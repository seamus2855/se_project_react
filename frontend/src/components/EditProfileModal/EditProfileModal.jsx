import React, { useEffect, useContext } from "react"; 
import { useForm } from "../../hooks/useForm"; 
import ModalWithForm from "../ModalWithForm/ModalWithForm"; 
import CurrentUserContext from "../../contexts/CurrentUserContext"; 

const EditProfileModal = ({ isOpen, onUpdateUser, onCloseModal, isLoading }) => { 
  // FIX: Destructure the currentUser context directly instead of looking for a nested key,
  // matching your App.js Provider value configuration exactly.
  const currentUser = useContext(CurrentUserContext); 

  const { values, handleChange, setValues } = useForm({ 
    name: "", 
    avatar: "", 
  }); 

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
          value={values.name} 
          onChange={handleChange} 
          minLength="2"
          maxLength="30"
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
          value={values.avatar} 
          onChange={handleChange} 
        /> 
      </label> 
    </ModalWithForm> 
  ); 
}; 

export default EditProfileModal;
