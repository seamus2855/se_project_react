import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  if (!item) return null;

  const handleClick = () => {
    onCardClick(item);
  };

  const imageSrc = item.imageUrl || item.link;

  return (
    <li
      className="item-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
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
