import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ weatherData, onCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
