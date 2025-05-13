import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
  titleStyles,
  titleClass,
  contentClass,
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className={`modal__content ${contentClass}`}>
        <h2 style={titleStyles} className={titleClass}>
          {title}
        </h2>

        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
