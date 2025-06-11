import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useEffect, useState } from "react";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  // useEffect(() => {
  //   if (window.innerWidth > 627) {
  //     setIsMobileMenuOpened(false);
  //   }
  // }, 
  // // add event listener
  // []);

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
            <li className="mobile-menu__add-clothes-btn">+ Add clothes</li>
          </ul>
        </nav>
      )}
      <div className="header__user-container">
        <ToggleSwitch className="header__toggle-switch" />
        <button onClick={handleAddClick} className="header__add-clothes-btn">
          + Add clothes
        </button>
        <Link to="/profile" className="header__link ">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
