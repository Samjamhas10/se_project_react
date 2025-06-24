import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
  handleProfile,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    console.log(isLiked);
    onCardLike({ id: item._id, isLiked });
  };

  // Check if the item was liked by the current user
  // The likes array should be an array of ids

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        isLoggedIn={isLoggedIn}
        handleProfile={handleProfile}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__info">
        <h1 className="card__name">{item.name}</h1>
        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
