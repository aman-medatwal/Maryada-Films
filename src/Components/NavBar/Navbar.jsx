import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="main-navigation">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" to="/">
          <span>Maryada Films</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
