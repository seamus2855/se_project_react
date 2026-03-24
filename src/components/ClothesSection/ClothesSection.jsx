import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike, // Add the like handler prop
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser?._id;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button className="clothes-section__add-button" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      <div className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike} // Pass the handler to ItemCard
          />
        ))}
      </div>
    </section>
  );
}

export default ClothesSection;
