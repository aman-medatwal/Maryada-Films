import React from 'react';
import './ServicesPage.css';
import { portfolioData } from '../data/portfolioData';

const ServicesPage = () => {
  const services = [
    {
      title: "Cinematic Production",
      description: "From concept to final cut, we create visually stunning cinematic experiences for films, commercials, and digital platforms.",
      category: "CINEMATIC"
    },
    {
      title: "CGI & VFX",
      description: "Pushing the boundaries of reality with high-end computer-generated imagery and visual effects that seamlessly blend with live-action.",
      category: "CGI"
    },
    {
      title: "Architectural Visualization",
      description: "Transforming blueprints into hyper-realistic 3D walkthroughs and renders that help you visualize spaces before they are built.",
      category: "Architectural_Visualization"
    },
    {
      title: "360 & VR",
      description: "Immersive virtual reality experiences and 360-degree videos that transport your audience to another world.",
      category: "360,VR"
    }
  ];

  return (
    <div className="page-container container section-padding" style={{ marginTop: '80px' }}>
      <div className="section-header text-center">
        <h1 className="section-title animate-slide-up">Our Services</h1>
        <div className="title-separator animate-slide-up delay-100"></div>
        <p className="section-description animate-slide-up delay-200">
          We offer a comprehensive suite of creative services tailored to meet the demands of modern visual storytelling.
        </p>
      </div>

      <div className="services-list animate-slide-up delay-300">
        {services.map((service, index) => {
          // Find a sample media from portfolioData for the background
          let bgMedia = null;
          if (portfolioData[service.category] && portfolioData[service.category].length > 0) {
            bgMedia = portfolioData[service.category][0].src;
          }

          return (
            <div key={index} className="service-card glass">
              <div className="service-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <button className="btn-primary mt-4">Learn More</button>
              </div>
              {bgMedia && (
                <div className="service-bg">
                  {bgMedia.endsWith('.mp4') ? (
                    <video src={bgMedia} autoPlay loop muted playsInline className="service-media" />
                  ) : (
                    <img src={bgMedia} alt={service.title} className="service-media" loading="lazy" />
                  )}
                  <div className="service-overlay"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ServicesPage;
