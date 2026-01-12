import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__section sidebar__section_user">
        <div className="sidebar__avatar">TT</div>
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>

      <nav className="sidebar__nav">
        <button className="sidebar__nav-item">Profile</button>
        <button className="sidebar__nav-item">Your Items</button>
        <button className="sidebar__nav-item">Settings</button>
      </nav>
    </aside>
  );
}

export default Sidebar;
