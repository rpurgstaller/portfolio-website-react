import React from "react";
import {NavLink} from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-container-left">
        <NavLink to="/" className={({ isActive }) => (isActive ? "header-logo active" : "header-logo")}>
          Roman Purgstaller
        </NavLink>
      </div>

      <div className="header-container-right">
        <nav className="navbar">
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            projects
          </NavLink>
          <NavLink to="/uses" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            picks
          </NavLink>
          <NavLink to="/bookshelf" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            bookshelf
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            about{" "}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
