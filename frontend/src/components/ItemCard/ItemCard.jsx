import React, { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item) return null;

  // Check if current user ID exists in the likes array
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Dynamic class for the button
  const itemLikeButtonClassName = `item-card__like-btn ${
    isLiked ? "item-card__like-btn_active" : "item-card__like-btn_inactive"
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // Prevents opening the modal when liking
    onCardLike(item, isLiked);
  };

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
            aria-label={isLiked ? "Unlike item" : "Like item"}
          />
        )}
      </div>
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="item-card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
