import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div
      className={`weather-modal ${
        activeModal === "preview" && "weather-modal__opened"
      }`}
    >
      <div className="weather-modal__content weather-modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="weather-modal__close"
        ></button>
        <img src={card.link} alt="card-link" className="weather-modal__image" />
        <div className="weather-modal__footer">
          <h2 className="weather-modal__caption">{card.name}</h2>
          <p className="weather-modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
