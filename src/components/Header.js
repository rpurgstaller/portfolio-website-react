import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <div>
        <Link to="/">home </Link>
        <Link to="/about">about </Link>
        <Link to="/projects">projects</Link>
        <Link to="/uses">uses</Link>
        <Link to="/bookshelf">bookshelf</Link>
    </div>
  );

}