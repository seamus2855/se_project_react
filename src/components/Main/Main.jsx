import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css"; // if you have a CSS file for Main

function Main({ weatherData, clothingItems, onCardClick }) {
  const temp = weatherData.temp.F;
  const weatherType = temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";

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
