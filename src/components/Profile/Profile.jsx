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
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button>Change profile data</button>
        <button onClick={onSignOut}>Log out</button>
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          weatherData={weatherData}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          userClothingItems={userItems}
        />
      </section>
    </div>
  );
}

export default Profile;
