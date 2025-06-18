import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleLike = () => {
    onCardLike(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `...`;

  return (
    <li className="card">
      <h1 className="card__name">{item.name}</h1>
      <button
        type="button"
        className="card__like-btn"
        onClick={handleLike}
      ></button>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
