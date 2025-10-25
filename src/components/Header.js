import React from "react";
import { NavLink } from "react-router-dom";


export default function Header() {
  return (
    <header className="header-container">
        <div className="header-container-logo">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "header-logo link-border active"
                : "header-logo link-border"
            }
          >
            Roman Purgstaller
          </NavLink>
        </div>
        <div className="header-container-nav">
          <nav className="navbar">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "link-border nav active" : "link-border nav"
              }
              title="Projects"
            >
              Projects
            </NavLink>
            <NavLink
              to="/practices"
              className={({ isActive }) =>
                isActive ? "link-border nav active" : "link-border nav"
              }
              title="Practices"
            >
              Practices
            </NavLink>
            <NavLink
              to="/picks"
              className={({ isActive }) =>
                isActive ? "link-border nav active" : "link-border nav"
              }
            >
              Picks
            </NavLink>
            <NavLink
              to="/bookshelf"
              className={({ isActive }) =>
                isActive ? "link-border nav active" : "link-border nav"
              }
            >
              Bookshelf
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "link-border nav active" : "link-border nav"
              }
            >
              About
            </NavLink>
          </nav>
        </div>
    </header>
  );
}
