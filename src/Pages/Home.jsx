import React from 'react'
import Navbar from '../Components/NavBar/Navbar'
import Hero from '../Components/Hero/Hero'
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
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

export default Home
