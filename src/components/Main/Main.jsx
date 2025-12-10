import "./Main.css";
import WeatherCard from '../WeatherCard/WeatherCard';
import { /* constants */ } from '../../utils/constants';

function Main({ weatherData }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg;F / You may want to wear:
          setClothingItems([...clothingItems, newItem])
        </p>
        <ul className="cards__list">
          {/* Render clothing items here */}
        </ul>
      </section>
    </main>
  );
}

export default Main;
