import "./Main.css";
import WeatherCard from "../../../vite-project/src/components/WeatherCard/WeatherCard.jsx";
import ItemCard from "../vite-project/src/ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/utils/constants.js";
import App from './components/App.js'

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <App>
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp.F} &deg: F / You may want to wear:
          </p>
          <ul className="cards__list">
            {defaultClothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              ))}
            ;
          </ul>
        </section>
      </App>
    </main>
  );
}

export default Main;
