import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar";

function Profile({ clothingItems, onAddClick, onCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
      />
    </section>
  );
}

export default Profile;
