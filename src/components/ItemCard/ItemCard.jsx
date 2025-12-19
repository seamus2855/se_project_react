
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <img
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
      />
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {item.weather && (
          <p className="card__weather">{item.weather}</p>
        )}
        {item.description && (
          <p className="card__description">{item.description}</p>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
