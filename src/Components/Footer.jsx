import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaVimeoV, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand animate-slide-up">
          <Link to="/" className="navbar-logo">
            MARYADA<span>FILMS</span>
          </Link>
          <p className="footer-tagline">Crafting Cinematic Masterpieces.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
            <a href="#" className="social-icon"><FaVimeoV /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-links animate-slide-up delay-200">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/projects">Portfolio</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/start-project">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact animate-slide-up delay-300">
          <h3>Contact Us</h3>
          <p>hello@maryadafilms.com</p>
          <p>+91 98765 43210</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Maryada Films. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
