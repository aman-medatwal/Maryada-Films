import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-container container section-padding" style={{ marginTop: '80px' }}>
      <div className="section-header text-center">
        <h1 className="section-title animate-slide-up">Start a Project</h1>
        <div className="title-separator animate-slide-up delay-100"></div>
        <p className="section-description animate-slide-up delay-200">
          Ready to create something extraordinary? Drop us a message and let's discuss your vision.
        </p>
      </div>

      <div className="contact-container animate-fade-in delay-300">
        <div className="contact-info glass">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Whether you have a question about services, pricing, or anything else, our team is ready to answer all your questions.</p>
          
          <div className="info-item">
            <h4>Email</h4>
            <p>hello@maryadafilms.com</p>
          </div>
          
          <div className="info-item">
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
          </div>
          
          <div className="info-item">
            <h4>Studio</h4>
            <p>123 Cinematic Way, Film City<br/>Mumbai, Maharashtra, India</p>
          </div>
        </div>

        <div className="contact-form glass">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Your Name"
              />
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="Your Email"
              />
            </div>
            
            <div className="form-group">
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
                placeholder="Subject"
              />
            </div>
            
            <div className="form-group">
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="Tell us about your project..."
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
