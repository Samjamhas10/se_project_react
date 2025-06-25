import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ handleProfile, isOpen, onClose, onChangeProfile }) {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onProfile = (event) => {
    event.preventDefault();
    handleProfile(data);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      titleClass="modal__title"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onProfile}
    >
      <label htmlFor="edit-name" className="profile__data">
        Name*
      </label>
      <input
        className="modal__input"
        id="edit-name"
        name="name"
        type="text"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
      />
      <label htmlFor="edit-avatar">Avatar URL*</label>
      <input
        className="modal__input"
        id="edit-avatar"
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        required
        value={data.avatar}
        onChange={handleChange}
      />
      <button type="submit" className="modal__submit modal__submit-profile">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
