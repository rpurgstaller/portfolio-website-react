import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">home </Link>
        <Link to="/about" className="nav-link">about </Link>
        <Link to="/projects" className="nav-link">projects</Link>
        <Link to="/uses" className="nav-link">uses</Link>
        <Link to="/bookshelf" className="nav-link">bookshelf</Link>
    </nav>
  );

}
