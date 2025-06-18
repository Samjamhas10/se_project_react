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
      title="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onLogin}
    >
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
      />
      <button type="submit" className="modal__submit">
        Log in
      </button>
      <button type="button" className="modal__submit">
        or Register
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
