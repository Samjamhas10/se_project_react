import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeletionModal.css";

function DeletionModal({
  activeModal,
  onClose,
  onSubmit,
  isOpen, //true
  handleDeleteItem,
}) {
  if (activeModal !== "delete") {
    return null;
  }

  return (
    <ModalWithForm
      title={`Are you sure you want to delete this item?\nThis action is irreversible.`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      titleStyles={{ textAlign: "center" }}
      titleClass="modal__title-delete"
      contentClass="modal__content_type_delete"
    >
      <div className="modal__delete-content">
        <button
          type="submit"
          className="modal__submit-delete"
          onClick={handleDeleteItem}
        >
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
