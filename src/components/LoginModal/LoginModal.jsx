import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ handleLogin, onClose, isOpen, openRegisterModal }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      <label htmlFor="login-email" className="email__field">
        Email
      </label>
      <input
        className="modal__input"
        id="login-email"
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <label htmlFor="login-password" className="password__field">
        Password
      </label>
      <input
        className="modal__input"
        id="login-password"
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <div className="login__buttons">
        <button type="submit" className="modal__submit modal__submit-login">
          Log in
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-signup"
          onClick={openRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
