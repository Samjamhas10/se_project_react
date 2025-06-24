import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div
      className={`item-modal ${
        activeModal === "preview" ? "item-modal__opened" : ""
      } ${activeModal === "delete" ? "delete-modal" : ""}`}
    >
      {" "}
      <div className="item-modal__content item-modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div>
            <h2 className="item-modal__caption">{card.name}</h2>
            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button className="item-modal__delete" onClick={handleDeleteClick} >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
