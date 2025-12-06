import React from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { NavItems } from "./NavItems";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

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
          <nav className={"navbar" + (open ? " open" : "")}>
            <button onClick={handleClick} className="header-nav-button-close responsive-btn">
                <FaTimes className="responsive-btn-icon"/>
            </button>
            {NavItems.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "link-border nav active" : "link-border nav"
                  }
                  title={item.title}
                  onClick={handleClick}
                >
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <button onClick={handleClick} className="header-nav-button responsive-btn">
            <FaBars className="responsive-btn-icon"/>
        </button>
    </header>
  );
}
