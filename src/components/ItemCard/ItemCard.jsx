import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item) return null;

  // Check if the current user's ID is in the likes array
  // item.likes is expected to be an array of user IDs
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Define the dynamic class name for the like button
  // item-card__like-btn_active should contain the filled heart styles
  const itemLikeButtonClassName = `item-card__like-btn ${
    isLiked ? "item-card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // Prevents the modal from opening
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const imageSrc = item.imageUrl || item.link;

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        {/* Only show the like button if a user is logged in (authorized) */}
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
        src={imageSrc}
        alt={item.name}
        className="item-card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
