import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeletionModal from "../DeletionModal/DeletionModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import api from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleDeleteClick = (card) => {
    //set active modal to delete
    setActiveModal("delete");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterModal = ({ name, avatar, email, password }) => {
    setActiveModal("register");
  };

  const handleLoginModal = ({ email, password }) => {
    setActiveModal("login");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return api.addNewClothes({ name, imageUrl, weather }).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    });
  };

  const handleDeleteItem = (itemToDelete) => {
    api
      .deleteItems(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    if (!email || !password || !name || !avatar) {
      return;
    }
    register(name, avatar, email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          localStorage.setItem("jwt", data.jwt);
        }
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (userData) => {
    if (!email || !password) {
      return;
    }
    // auth
    authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          localStorage.setItem("jwt", data.jwt);
        }
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    const jwt = getToken(); // try to get token form localStorage
    if (!jwt) {
      return;
    }
    checkToken(jwt)
      .then((data) => {
        const { email, password } = data;
        setIsLoggedIn(true);
        setCurrentUser({ name: "Sam", email: "sam@gmail.com" });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      })
      .finally(() => {});
  }, []);

  //props = {weatherData: weatherData, clothingItems: clothingItems, onCardClick: handleCardClick}
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page"></div>{" "}
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
            handleDeleteClick={handleDeleteClick}
          />
          <DeletionModal
            isOpen={activeModal === "delete"} // true or false
            activeModal={activeModal}
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteItem(selectedCard);
            }}
            onClose={closeActiveModal}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
