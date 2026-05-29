import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = 
useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Start Project', path: '/start-project' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <img src="/web_work/logo/MARDAYA FILMS Logo monogram.png" alt="Maryada Films Logo" className="monogram-logo" />
        </Link>
        
        <div className="desktop-menu">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link, index) => (
          <Link 
            key={index} 
            to={link.path} 
            className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
