import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
  onEditProfileClick,
  onLogout,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
