import React from 'react';
import { Link } from 'react-router-dom';
import VideoBackground from '../Components/VideoBackground';
import GalleryGrid from '../Components/GalleryGrid';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <VideoBackground 
        src="/web_work/CINEMATIC/citysample.mp4" 
        poster="/web_work/CINEMATIC/016.png"
      >
        <div className="hero-content text-center container">
          <h1 className="hero-title animate-slide-up">Vision Meets Reality</h1>
          <p className="hero-subtitle animate-slide-up delay-200">
            Award-winning visual effects, 3D animation, and cinematic storytelling.
          </p>
          <div className="hero-actions animate-fade-in delay-400">
            <Link to="/projects" className="btn-primary">View Our Work</Link>
          </div>
        </div>
      </VideoBackground>

      <section className="featured-section section-padding container">
        <div className="section-header text-center">
          <h2 className="section-title">Featured Portfolios</h2>
          <div className="title-separator"></div>
          <p className="section-description">
            Explore our diverse range of expertise from Architectural Visualization to Cinematic VFX.
          </p>
        </div>
        
        <GalleryGrid />
      </section>

      <section className="cta-section section-padding">
        <div className="container text-center glass cta-box animate-scale-up">
          <h2>Ready to bring your vision to life?</h2>
          <p>Let's collaborate on your next big project.</p>
          <Link to="/start-project" className="btn-primary mt-4">Start a Project</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
