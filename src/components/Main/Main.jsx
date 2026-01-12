import React from "react";
import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems = [], onCardClick }) {
  const temp = weatherData?.temp?.F ?? "--";

  // Determine weather type based on temperature
  const weatherType =
    temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";

  // Filter clothing items by weather type
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {temp}°F — You may want to wear:
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
