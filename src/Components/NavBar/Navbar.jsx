import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Showreel", path: "/" },
    { label: "Works", path: "/projects" },
    { label: "Studio", path: "/about" },
    { label: "Services", path: "/services" },
  ];

  return (
    <header className="main-navigation py-3">
      <nav className="navbar navbar-expand-lg nav-shell container" aria-label="Main navigation">
        <Link className="navbar-brand brand d-flex align-items-center" to="/" onClick={() => setIsOpen(false)}>
          <span>Maryada Films</span>
        </Link>

        <button
          className="navbar-toggler menu-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ml-auto align-items-lg-center nav-links">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ml-lg-3">
              <Link className="nav-link nav-cta" to="/start-project" onClick={() => setIsOpen(false)}>
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
