import { useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../context/CurrentUserContext";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  weatherData,
  onCardClick,
  clothingItems,
  handleAddClick,
  onSignOut,
  onChangeProfile,
  onCardLike,
  isLoggedIn,
  handleProfile,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // const userItems = clothingItems.filter(
  //   (item) => item.owner === currentUser._id
  // ); // don't need it because you do everything inside clothingSection

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button onClick={onChangeProfile} className="edit__profile">
          Change profile data
        </button>
        <button onClick={onSignOut} className="logout__profile">
          Log out
        </button>
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          weatherData={weatherData}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          // userClothingItems={userItems}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
          handleProfile={handleProfile}
        />
      </section>
    </div>
  );
}

export default Profile;
