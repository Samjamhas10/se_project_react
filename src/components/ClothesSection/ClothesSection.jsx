import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  isLoggedIn,
  handleProfile,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems &&
          userClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
                handleProfile={handleProfile}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
