import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onSignOut, onChangeProfile }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__options">
        <p className="sidebar__username">{currentUser.name}</p>
        <img
          src={currentUser.avatar || avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        {/* <p className="sidebar__username">Terrence Tegegne</p>
        <p className="sidebar__data">Change profile data</p>
        <p className="sidebar__sign-out">Log out</p> */}
      </div>
    </div>
  );
}

export default SideBar;
