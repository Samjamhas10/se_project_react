import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  handleRegistration,
  isOpen,
  onClose,
  openLoginModal,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onRegistration = (event) => {
    event.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      titleClass="modal__title"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onRegistration}
    >
      <label htmlFor="email" className="register-modal__label">
        Email*
      </label>
      <input
        className="modal__input"
        id="email"
        name="email"
        type="email"
        value={data.email}
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password*</label>
      <input
        className="modal__input"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <label htmlFor="register-name">Name*</label>
      <input
        className="modal__input"
        id="register-name"
        name="name"
        type="text"
        placeholder="Name"
        required
        value={data.name}
        onChange={handleChange}
      />
      <label htmlFor="avatar">Avatar URL*</label>
      <input
        className="modal__input"
        id="avatar"
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        required
        value={data.avatar}
        onChange={handleChange}
      />
      <div className="register__buttons">
        <button type="submit" className="modal__submit modal__submit-register">
          Sign up
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-log"
          onClick={openLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
