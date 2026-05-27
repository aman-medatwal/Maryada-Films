import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="main-navigation">
      <nav className="nav-shell container" aria-label="Main navigation">
        <Link className="brand" to="/">
          <span>Maryada Films</span>
        </Link>
        
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>HOME</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>PROJECTS</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>SERVICES</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>ABOUT</NavLink>
          <NavLink to="/start-project" className={({ isActive }) => isActive ? "active" : ""}>START PROJECT</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
