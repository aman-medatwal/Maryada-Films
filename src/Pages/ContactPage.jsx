import React from 'react'
import Navbar from '../Components/NavBar/Navbar'
import Contact from '../Components/Contact/Contact'
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <Contact />
      <footer className="site-footer">
        <div className="footer-content">
          <p>Maryada<br />Films</p>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          <p>&copy; 2026 Maryada Films. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default ContactPage
