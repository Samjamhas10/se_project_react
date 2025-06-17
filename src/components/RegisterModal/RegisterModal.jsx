import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ handleRegistration, isOpen, onClose }) {
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
    <ModalWithForm title="register" isOpen={isOpen} onClose={onClose}>
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
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={data.name}
        onChange={handleChange}
      />
      <label htmlFor="avatarUrl">Avatar Url:</label>
      <input
        id="avatarUrl"
        name="avatarUrl"
        type="url"
        value={data.avatarurl}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
