import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeletionModal.css";

function DeletionModal({
  activeModal,
  onClose,
  onSubmit,
  onDelete,
  isOpen, //true
  handleDeleteItem,
}) {
  if (activeModal !== "delete") {
    return null;
  }

  return (
    <ModalWithForm
      buttonText={"Yes, delete item"}
      title={
        "Are you sure you want to delete this item? This action is irreversible."
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      titleStyles={{textAlign: "center"}}
    >
        <button type="submit" className="modal__submit">
            Delete
          </button>
          <button type="button" className="modal__submit">
            Cancel
          </button>
    </ModalWithForm>
  );

  //   return (
  //     // <div className="deletion-modal deletion-modal__opened">

  //     <div className={`modal ${isOpen && "modal__opened"}`}>
  //       <div className="deletion-modal__content">
  //         <p>
  //           Are you sure you want to delete this item? This action is
  //           irreversible.{" "}
  //         </p>
  //         <button className="deletion-modal__confirm" onClick={handleDelete}>
  //           Yes, delete item
  //         </button>
  //         <button className="deletion-modal__cancel" onClick={onClose}>
  //           Cancel
  //         </button>
  //       </div>
  //     </div>
  //   );
}

export default DeletionModal;
