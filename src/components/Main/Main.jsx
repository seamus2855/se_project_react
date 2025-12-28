import WeatherCard from "./components/WeatherCard/WeatherCard";
import ItemCard from "./components/ItemCard/ItemCard";
import "./components/Main/Main";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Determine weather type
  const temp = weatherData.temp.F;
  const weatherType = temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";

  // Filter items by weather
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp}&deg;F / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
