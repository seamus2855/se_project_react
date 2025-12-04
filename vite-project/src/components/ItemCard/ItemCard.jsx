import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
