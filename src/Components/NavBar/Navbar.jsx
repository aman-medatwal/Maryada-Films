import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`main-navigation ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-shell container" aria-label="Main navigation">
        <Link className="brand-logo" to="/">
          <img src="/my_work/logo/MARDAYA FILMS Logo.png" alt="Maryada Films Logo" className="navbar-logo-img" style={{height: '35px', filter: 'drop-shadow(0px 0px 5px rgba(255, 170, 0, 0.5))'}} />
        </Link>
        
        <div className="nav-links-tech">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>HOME</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>ABOUT</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>SERVICES</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>WORK</NavLink>
          <NavLink to="/case-studies" className={({ isActive }) => isActive ? "active" : ""}>CASE STUDIES</NavLink>
          <NavLink to="/careers" className={({ isActive }) => isActive ? "active" : ""}>CAREERS</NavLink>
          <NavLink to="/start-project" className="btn-tech-solid">GET A QUOTE</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
