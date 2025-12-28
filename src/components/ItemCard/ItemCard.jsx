import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  // Support both formats:
  // - item.imageUrl (your intended structure)
  // - item.link (WTWR default data)
  const imageSrc = item.imageUrl || item.link;

  return (
    <li className="item-card" onClick={handleClick}>
      <img
        src={imageSrc}
        alt={item.name}
        className="item-card__image"
      />
      <p className="item-card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
