import React, { useRef, useState } from 'react';
import PageHero from '../Components/PageHero';
import { Starfield, GlowingSpheresBackground } from '../Components/ThreeEffects';
import { Canvas } from '@react-three/fiber';
import './ContactPage.css';

const ContactPage = () => {
  const formCardRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      setMessage('Please fill in all fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001/api/transmit'
        : '/api/transmit';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Transmission successful! We will be in touch shortly.');
        setFormData({ name: '', email: '', details: '' });
      } else {
        setStatus('error');
        setMessage(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to the server. Please try again later.');
    }
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
        {/* 3D Glowing Spheres Background - OPTIMIZED */}
        <div className="contact-3d-bg">
          <Canvas 
            camera={{ position: [0, 0, 5] }} 
            dpr={[0.1, 0.5]} 
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <GlowingSpheresBackground />
          </Canvas>
        </div>

        <div className="contact-content container">
          <div 
            className="glass-form-card dark-glass" 
            ref={formCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: 'transform' }}
          >
            <div className="glass-card-header">
              <h2 className="tech-heading mb-2 text-yellow">START PROJECT</h2>
              <p className="tech-body text-secondary">Fill out the details below and we will get back to you shortly.</p>
            </div>
            
            <form className="glass-form dark-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>NAME</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" disabled={status === 'loading'} />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" disabled={status === 'loading'} />
              </div>
              <div className="form-group">
                <label>PROJECT DETAILS</label>
                <textarea rows="4" name="details" value={formData.details} onChange={handleChange} placeholder="Tell us about your vision..." disabled={status === 'loading'}></textarea>
              </div>
              
              {message && (
                <div className={`form-message ${status}`}>
                  {message}
                </div>
              )}

              <button type="submit" className="btn-primary w-full mt-6" style={{width: '100%'}} disabled={status === 'loading'}>
                {status === 'loading' ? 'TRANSMITTING...' : 'TRANSMIT'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

