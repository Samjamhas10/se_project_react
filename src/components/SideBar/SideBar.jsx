import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default-avatar" />
      <div className="sidebar__options">
        <p className="sidebar__username">Terrence Tegegne</p>
        <p className="sidebar__data">Change profile data</p>
        <p className="sidebar__sign-out">Log out</p>
      </div>
    </div>
  );
}

export default SideBar;
