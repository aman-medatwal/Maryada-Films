import React from 'react';
import PageHero from '../Components/PageHero';
import { FloatingGeometry } from '../Components/ThreeEffects';
import PanoramaViewer from '../Components/PanoramaViewer';
import './ServicesPage.css';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <PageHero 
        title="OUR"
        subtitle="SERVICES"
        videoSrc="/my_work/CGI/bookfiled.mp4"
        effect={FloatingGeometry}
        metaText="END-TO-END PRODUCTION PIPELINE"
      />
      
      <section className="services-content section-padding container">
        <div className="services-grid">
          
          <div className="services-text" style={{gridColumn: '1 / -1'}}>
            <h2 className="tech-heading text-yellow mb-6 text-center">WHAT WE DO</h2>
            <p className="tech-body mb-6 text-center mx-auto" style={{maxWidth: '800px'}}>
              Our studio provides a full spectrum of digital creation services. We handle everything from initial concept visualization to final post-production rendering.
            </p>
            <div className="what-we-do-grid mt-12">
              <div className="feature-card glass">
                <h3 className="feature-number text-yellow">01 //</h3>
                <h4 className="feature-title">3D ANIMATION & CGI</h4>
                <p className="tech-body text-secondary mt-2">Character animation, product rendering, and full CGI environments.</p>
              </div>
              <div className="feature-card glass">
                <h3 className="feature-number text-yellow">02 //</h3>
                <h4 className="feature-title">VISUAL EFFECTS (VFX)</h4>
                <p className="tech-body text-secondary mt-2">Compositing, rotoscoping, matte painting, and dynamic simulations.</p>
              </div>
              <div className="feature-card glass">
                <h3 className="feature-number text-yellow">03 //</h3>
                <h4 className="feature-title">ARCHITECTURAL VISUALIZATION</h4>
                <p className="tech-body text-secondary mt-2">Photorealistic interior and exterior renders for real estate.</p>
              </div>
              <div className="feature-card glass">
                <h3 className="feature-number text-yellow">04 //</h3>
                <h4 className="feature-title">360° VR EXPERIENCES</h4>
                <p className="tech-body text-secondary mt-2">Immersive virtual reality tours and interactive 360-degree videos.</p>
              </div>
              <div className="feature-card glass">
                <h3 className="feature-number text-yellow">05 //</h3>
                <h4 className="feature-title">MOTION GRAPHICS</h4>
                <p className="tech-body text-secondary mt-2">Sleek title sequences, UI animations, and promotional graphics.</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* NEW CAPABILITIES SHOWCASE */}
      <section className="capabilities-section section-padding container">
        <div className="text-center mb-12">
          <h2 className="tech-heading text-yellow">CAPABILITIES SHOWCASE</h2>
          <p className="tech-body mt-2">A glimpse into our visual effects workflows.</p>
        </div>
        <div className="capabilities-3d-scene">
          <div className="capability-3d-card card-dark">
             <video src="/my_work/CINEMATIC/bike.mp4" autoPlay loop muted playsInline></video>
             <h3 className="card-title mt-4">AUTOMOTIVE CGI</h3>
             <p className="card-desc mt-2">High-end product rendering and animation.</p>
          </div>
          <div className="capability-3d-card card-light">
             <video src="/my_work/CINEMATIC/half_robo_action.mp4" autoPlay loop muted playsInline></video>
             <h3 className="card-title mt-4">CHARACTER ANIMATION</h3>
             <p className="card-desc mt-2">Rigging, animation, and motion capture cleanup.</p>
          </div>
        </div>
      </section>

      {/* FULL WIDTH VR SHOWCASE */}
      <section className="full-width-vr-section">
        <div className="vr-header-overlay">
          <h2 className="tech-heading-large text-yellow shadow-text">VR SANDBOX</h2>
          <p className="tech-subheading">CLICK AND DRAG TO EXPLORE THE 360° ENVIRONMENT</p>
        </div>
        <div className="full-vr-container">
          <PanoramaViewer imagePath="/my_work/360,VR/Panorama8_000.jpg" />
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
