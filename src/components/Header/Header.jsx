import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
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
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

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
            <li className="mobile-menu__username">{currentUser.name}</li>
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
        <button
          type="button"
          onClick={handleRegisterModal}
          className="header__register-btn"
        >
          Sign up
        </button>
        <LoginModal className="header__login-modal" />
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={handleLoginModal}
            className="header__login-btn"
          >
            Log in
          </button>
        ) : (
          <div>
            <button
              onClick={handleAddClick}
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            {!currentUser ? (
              <button
                type="button"
                onClick={handleLoginModal}
                className="header__login-btn"
              >
                Log in
              </button>
            ) : (
              <Link to="/profile" className="header__link ">
                <p className="header__username">{currentUser.name}</p>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
