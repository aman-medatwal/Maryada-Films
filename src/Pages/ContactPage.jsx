import React, { useRef } from 'react';
import PageHero from '../Components/PageHero';
import { Starfield, GlowingSpheresBackground } from '../Components/ThreeEffects';
import { Canvas } from '@react-three/fiber';
import './ContactPage.css';

const ContactPage = () => {
  const formCardRef = useRef(null);

  // 3D Tilt Effect for the Glass Card
  const handleMouseMove = (e) => {
    if (!formCardRef.current) return;
    const card = formCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!formCardRef.current) return;
    formCardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="contact-page dark-theme">
      
      <PageHero 
        title="START"
        subtitle="PROJECT"
        videoSrc="/my_work/Architectural Visualization/Residential plots.mp4"
        effect={Starfield}
        metaText="GET A QUOTE &middot; LET'S TALK"
      />

      <section className="contact-form-section">
        {/* 3D Glowing Spheres Background */}
        <div className="contact-3d-bg">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <GlowingSpheresBackground />
          </Canvas>
        </div>

        <div className="contact-content container">
          <div 
            className="glass-form-card dark-glass" 
            ref={formCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="glass-card-header">
              <h2 className="tech-heading mb-2 text-yellow">START PROJECT</h2>
              <p className="tech-body text-secondary">Fill out the details below and we will get back to you shortly.</p>
            </div>
            
            <form className="glass-form dark-form">
              <div className="form-group">
                <label>NAME</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>PROJECT DETAILS</label>
                <textarea rows="4" placeholder="Tell us about your vision..."></textarea>
              </div>
              <button type="button" className="btn-primary w-full mt-6" style={{width: '100%'}}>TRANSMIT</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
