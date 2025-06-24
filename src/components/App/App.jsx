// import React hooks and React Router
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// import utils and API
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { storeToken, getToken } from "../../utils/token";
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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  // current state tracking whether user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // clothing items list
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isDeleting, setIsDeleting] = useState(null);

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

  // API handlers
  // Add clothing item to database
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    return api
      .addNewClothes({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    //isLiked -> !isLiked
    // Check if this card is not currently liked
    if (!isLiked) {
      api
        // the first argument is the card's id
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      // if not, send a request to remove the user's id from the card's likes array
      api
        // the first argument is the card's id
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => {
          console.error(err);
          alert("Could not like item. Please try again");
        });
    }
  };

  // delete clothing item
  const handleDeleteItem = (item_id) => {
    const token = localStorage.getItem("jwt");
    return api
      .deleteItems(item_id, token)
      .then(() => {
        setIsDeleting(item_id);
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== item_id)
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
        closeActiveModal();
        return handleLogin({ email, password });
      })
      .catch(console.error);
  };

  // handle user login
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return Promise.reject();
    }
    authorize(email, password)
      .then((data) => {
        // Check token
        if (data.token) {
          // stores the token in local storage
          storeToken(data.token);
          // sets the the isLoggedIn state to be true, which we can then use to conditionally render different parts of our app
          setIsLoggedIn(true);
          return checkToken(data.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData); // set real user info here
        closeActiveModal();
      })
      .catch(console.error);
  };

  const openRegisterModal = () => {
    setActiveModal("signup");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    api
      .updateProfile(name, avatar, token)
      .then((updatedUser) => {
        // setIsLoggedIn(true);
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // handle logout
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt"); // remove the token from localStorage
  };

  useEffect(() => {
    const jwt = getToken(); // try to get token form localStorage
    if (!jwt) {
      return;
    }
    checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
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
                handleRegisterModal={openRegisterModal}
                handleLoginModal={openLoginModal}
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
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
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
                        onCardLike={handleCardLike}
                        handleAddClick={handleAddClick}
                        onSignOut={handleSignOut}
                        onChangeProfile={openProfileModal}
                        isLoggedIn={isLoggedIn}
                        handleProfile={handleProfile}
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
              handleDeleteClick={handleDeleteClick}
              onClick={handleCardLike}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onChangeProfile={openProfileModal}
              handleProfile={handleProfile}
            ></EditProfileModal>
            <DeletionModal
              isOpen={activeModal === "delete"} // true or false
              activeModal={activeModal}
              onSubmit={(e) => {
                e.preventDefault();
                handleDeleteItem(selectedCard._id);
              }}
              onClick={() => handleDeleteClick(card)}
              onClose={closeActiveModal}
            ></DeletionModal>
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
