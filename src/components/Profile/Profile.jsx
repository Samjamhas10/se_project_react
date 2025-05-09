import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ weatherData, clothingItems, handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          weatherData={weatherData}
          handleCardClick={handleCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
