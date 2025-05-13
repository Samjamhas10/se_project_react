import "./DeletionModal.css";

function DeletionModal({ activeModal, onClose, onSubmit, onDelete, isOpen }) {
  if (activeModal !== "delete") {
    return null;
  }

  return (
    // <div className="deletion-modal deletion-modal__opened">
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="deletion-modal__content">
        <p>
          Are you sure you want to delete this item? This action is
          irreversible.{" "}
        </p>
        <button className="deletion-modal__confirm" onClick={onDelete}>
          Yes, delete item
        </button>
        <button className="deletion-modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletionModal;
