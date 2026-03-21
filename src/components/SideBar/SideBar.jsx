import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function Sidebar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  // Helper for avatar placeholder
  const userLetter = currentUser?.name?.charAt(0).toUpperCase() || "";

  return (
    <aside className="sidebar">
      <div className="sidebar__section sidebar__section_user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userLetter}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__controls">
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onEditProfileClick}
        >
          Edit profile
        </button>
        <button
          className="sidebar__logout-btn"
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
