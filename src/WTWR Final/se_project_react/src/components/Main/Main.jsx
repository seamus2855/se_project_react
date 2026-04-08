import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems = [], onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // 1. Safely extract temperature based on the context unit
  // If data is missing, we use a placeholder to avoid layout shifts
  const temp = weatherData?.temp?.[currentTemperatureUnit] ?? "--";

  // 2. Determine weather type using Fahrenheit for consistency with your business logic
  // We use a helper variable to make the filtering logic more readable
  const tempF = weatherData?.temp?.F;
  
  const weatherType = (() => {
    if (tempF === undefined) return ""; // Handle loading state
    if (tempF >= 86) return "hot";
    if (tempF >= 66) return "warm";
    return "cold";
  })();

  // 3. Filter items safely
  // We ensure clothingItems is an array and filter based on the calculated weatherType
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {weatherData?.temp 
            ? `Today is ${temp}°${currentTemperatureUnit} — You may want to wear:`
            : "Loading weather data..."}
        </p>
        
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard 
              key={item._id || item.id} // Standardize on ID field
              item={item} 
              onCardClick={onCardClick} 
              onCardLike={onCardLike} 
            />
          ))}
        </ul>

        {/* Optional: Show a message if no items match the weather */}
        {weatherType && filteredItems.length === 0 && (
          <p className="cards__no-items">
            No clothing items found for {weatherType} weather.
          </p>
        )}
      </section>
    </main>
  );
}

export default Main;
