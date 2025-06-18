// import React hooks and React Router
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// import utils and API
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { setToken, getToken } from "../../utils/token";
import { register, authorize, checkToken } from "../../utils/auth";
import api from "../../utils/api";

// import components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeletionModal from "../DeletionModal/DeletionModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";

// import contexts
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";

// import styles
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  // current logged-in user state variable/setting state
  const [currentUser, setCurrentUser] = useState(null);

  // current state tracking whether user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // clothing items list
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleDeleteClick = (card) => {
    //set active modal to delete
    setActiveModal("delete");
    setSelectedCard(card);
  };

  // modal handlers
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

  const handleRegisterModal = ({ email, password, name, avatar }) => {
    const data = { email, password, name, avatar };
    setActiveModal("signup");
    handleRegistration(data);
    console.log("Registration data:", data);
  };

  const handleLoginModal = ({ email, password }) => {
    setActiveModal("login");
  };

  // API handlers
  // Add clothing item to database
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return api.addNewClothes({ name, imageUrl, weather }).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // delete clothing item
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

  // handle user registration
  const handleRegistration = ({ email, password, name, avatar }) => {
    if (!email || !password || !name || !avatar) {
      return;
    }
    register(email, password, name, avatar)
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

  // handle user login
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
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

  // handle logout
  const handleSignOut = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("jwt"); // remove the token from localStorage
    console.log("User logged out successfully");
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
        setCurrentUser(data.user);
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
        <div className="page">
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
                      // onCardLike={onCardLike}
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
                        onSignOut={handleSignOut}
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
              isOpen={activeModal === "signup"}
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
              onClick={handleCardLike}
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
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
