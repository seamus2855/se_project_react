import React, { useContext } from "react";
import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems = [], onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Safely read temperature in the correct unit
  const temp =
    currentTemperatureUnit === "F"
      ? weatherData?.temp?.F ?? "--"
      : weatherData?.temp?.C ?? "--";

  // Determine weather type based on Fahrenheit (API baseline)
  const tempF = weatherData?.temp?.F ?? 0;
  const weatherType =
    tempF >= 86 ? "hot" : tempF >= 66 ? "warm" : "cold";

  // Filter clothing items by weather type
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {temp}°{currentTemperatureUnit} — You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
