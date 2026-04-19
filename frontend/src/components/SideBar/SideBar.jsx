import React, { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Sidebar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  // Use a fallback for the name and avatar to prevent errors if context is loading
  const userName = currentUser?.name || "User";
  const userAvatar = currentUser?.avatar;
  const userLetter = userName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userLetter}</div>
        )}
        <p className="sidebar__name">{userName}</p>
      </div>
      
      <div className="sidebar__controls">
        <button 
          className="sidebar__button" 
          type="button" 
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button 
          className="sidebar__button sidebar__button_logout" 
          type="button" 
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
