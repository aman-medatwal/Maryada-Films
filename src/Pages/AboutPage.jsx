import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="page-container container section-padding" style={{ marginTop: '80px' }}>
      <div className="section-header text-center">
        <h1 className="section-title animate-slide-up">About Maryada Films</h1>
        <div className="title-separator animate-slide-up delay-100"></div>
      </div>
      
      <div className="about-content">
        <div className="about-text glass animate-fade-in delay-200">
          <h2>Who We Are</h2>
          <p>
            Maryada Films is a premier creative studio specializing in high-end visual effects, 3D animation, architectural visualization, and cinematic production. We merge art with technology to deliver stunning visuals that captivate audiences.
          </p>
          <p>
            With years of experience in the industry, our dedicated team of artists and technicians work tirelessly to push the boundaries of what's possible, turning imagination into reality.
          </p>
        </div>
        
        <div className="about-stats animate-fade-in delay-300">
          <div className="stat-box glass">
            <h3>10+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-box glass">
            <h3>500+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-box glass">
            <h3>50+</h3>
            <p>Industry Awards</p>
          </div>
          <div className="stat-box glass">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
