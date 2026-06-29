import React, { useContext } from "react"; 
import "./Profile.css"; 
import ClothesSection from "../ClothesSection/ClothesSection"; 
import SideBar from "../SideBar/SideBar"; 
import CurrentUserContext from "../../contexts/CurrentUserContext"; 

function Profile({ 
  clothingItems, 
  onAddClick, 
  onCardClick, 
  onCardLike, 
  onEditProfileClick, 
  onLogout, 
}) { 
  const currentUser = useContext(CurrentUserContext); 

  // FIX: Safely extract the owner ID whether it is a string or an object, then compare them as clean strings
  const userItems = clothingItems.filter((item) => {
    if (!item.owner || !currentUser?._id) return false;
    
    const itemOwnerId = item.owner._id || item.owner; 
    const currentUserId = currentUser._id;

    return String(itemOwnerId) === String(currentUserId);
  }); 

  return ( 
    <section className="profile"> 
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} /> 
      <ClothesSection 
        clothingItems={userItems} 
        onAddClick={onAddClick} 
        onCardClick={onCardClick} 
        onCardLike={onCardLike} 
      /> 
    </section> 
  ); 
} 

export default Profile;
