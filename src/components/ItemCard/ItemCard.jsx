import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card" onClick={handleClick}>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
      />
      <p className="item-card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
