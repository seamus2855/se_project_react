import React from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__section sidebar__section_user">
        <div className="sidebar__avatar">TT</div>
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default Sidebar;
