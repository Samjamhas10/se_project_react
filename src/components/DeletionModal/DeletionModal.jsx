import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeletionModal.css";

function DeletionModal({
  activeModal,
  onClose,
  onSubmit,
  isOpen, //true
}) {
  if (activeModal !== "delete") {
    return null;
  }

  return (
    <ModalWithForm
      //   buttonText={"Yes, delete item"}
      title={
        "Are you sure you want to delete this item? This action is irreversible."
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      titleStyles={{ textAlign: "center" }}
      titleClass="modal__title-delete"
    >
      <div className="modal__delete-content">
        <button type="submit" className="modal__submit">
          Yes, delete item
        </button>
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}

export default DeletionModal;
