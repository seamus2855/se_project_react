import React, { useContext } from "react"; // 1. Import useContext
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // 2. Import your context

function Profile({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
  onEditProfileClick,
  onLogout,
}) {
  const { currentUser } = useContext(CurrentUserContext); // 3. Get the current user

  // 4. Filter items so you only see YOUR items on the profile
  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser?._id;
  });

  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        clothingItems={userItems} // 5. Pass the filtered items here
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
