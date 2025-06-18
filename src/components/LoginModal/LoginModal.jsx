import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./LoginModal.css";

function LoginModal({ handleLogin, onClose, isOpen }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = (event) => {
    event.preventDefault();
    handleLogin(data);
  };

  return (
    <ModalWithForm
      title="Log in"
      titleClass="modal__title"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onLogin}
    >
      <label htmlFor="email" className="email__field">
        Email
      </label>
      <input
        className="modal__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <label htmlFor="password" className="password__field">
        Password
      </label>
      <input
        className="modal__input"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <button type="submit" className="modal__submit">
        Log in
      </button>
      <button type="button" className="modal__submit">
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
