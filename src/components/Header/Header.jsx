import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterModal,
  handleLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div onClick={mobileMenuHandler} className="hamburger">
        <span></span>
        <span></span>
      </div>
      {isMobileMenuOpened && (
        <nav className="mobile-menu">
          <button
            onClick={mobileMenuHandler}
            type="button"
            className="mobile-menu__close"
          ></button>
          <div className="mobile-menu__logo-container">
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="mobile-menu__logo"
            />
          </div>
          <ul className="mobile-menu__list">
            <li className="mobile-menu__username">Terrance Tegenge</li>
            <li></li>
            <li
              onClick={handleAddClick}
              className="mobile-menu__add-clothes-btn"
            >
              + Add clothes
            </li>
            {/* <li>
              <ToggleSwitch className="header__toggle-switch" />
            </li> */}
          </ul>
        </nav>
      )}
      <div className="header__user-container">
        <ToggleSwitch className="header__toggle-switch" />
        <RegisterModal className="header__register-modal" />
        <button type="button" onClick={handleRegisterModal}>
          Sign up
        </button>
        <LoginModal className="header__login-modal" />
        <button type="button" onClick={handleLoginModal}>
          Log in
        </button>
        {/* <button onClick={handleAddClick} className="header__add-clothes-btn">
          + Add clothes
        </button>
        <Link to="/profile" className="header__link ">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link> */}
      </div>
    </header>
  );
}

export default Header;
