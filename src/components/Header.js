import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-container-left">
        <Link to="/" className="header-logo">
          Roman Purgstaller
        </Link>
      </div>

      <div className="header-container-right">
        <nav className="navbar">
          <Link to="/about" className="nav-link">
            about{" "}
          </Link>
          <Link to="/projects" className="nav-link">
            projects
          </Link>
          <Link to="/uses" className="nav-link">
            uses
          </Link>
          <Link to="/bookshelf" className="nav-link">
            bookshelf
          </Link>
        </nav>
      </div>
    </header>
  );
}
