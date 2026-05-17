import React, { useContext } from "react"; 
import "./ClothesSection.css"; 
import ItemCard from "../ItemCard/ItemCard"; 
import CurrentUserContext from "../../contexts/CurrentUserContext"; 

function ClothesSection({ 
  clothingItems, 
  onAddClick, 
  onCardClick, 
  onCardLike, 
}) { 
  const currentUser = useContext(CurrentUserContext); 

  // FIX: Removed duplicate filtering constraint. Profile.js already handles filtering.
  // If fallback protection is needed for pure reuse, cast IDs to String types cleanly.
  const displayItems = clothingItems.filter((item) => {
    if (!item.owner || !currentUser?._id) return true; // If profile already filtered them, don't drop items
    const itemOwnerId = item.owner._id || item.owner;
    return String(itemOwnerId) === String(currentUser._id);
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
        {displayItems.map((item) => ( 
          <ItemCard 
            key={item._id || item.id} 
            item={item} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
          /> 
        ))} 
      </div> 
    </section> 
  ); 
} 

export default ClothesSection;
