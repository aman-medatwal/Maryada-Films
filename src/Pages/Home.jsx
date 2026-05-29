import React, { Suspense } from 'react';
import PageHero from '../Components/PageHero';
import { ParticleField, FloatingLogo } from '../Components/ThreeEffects';
import HorizontalShowcase from '../Components/HorizontalShowcase';
import PanoramaViewer from '../Components/PanoramaViewer';
import { Canvas } from '@react-three/fiber';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-tech">
      
      {/* 1. HERO SECTION */}
      <PageHero 
        title="WATCH THE"
        subtitle="SHOWREEL"
        videoSrc="/my_work/CINEMATIC/citysample.mp4"
        effect={ParticleField}
        metaText="2024 DEMO REEL &middot; 3 MIN"
      />

      {/* 2. STUDIO OVERVIEW SECTION */}
      <section className="home-about-section section-padding container">
        <div className="home-about-grid">
          <div className="home-about-text">
            <h2 className="tech-heading text-yellow mb-6">WE ARE MARYADA FILMS</h2>
            <p className="tech-body mb-4">
              A pioneering visual effects and 3D animation studio based in Mumbai. We specialize in bringing impossible concepts to life through cutting-edge CGI, architectural visualization, and immersive VR experiences.
            </p>
            <p className="tech-body mb-8">
              From cinematic blockbusters to photorealistic product renders, our pipeline is built to handle the most demanding creative visions.
            </p>
            <button className="btn-tech-solid">DISCOVER OUR PROCESS</button>
          </div>
          
          <div className="home-about-3d">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ffaa00" />
              <Suspense fallback={null}>
                <FloatingLogo />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE SECTION */}
      <HorizontalShowcase />

      {/* 4. FULL WIDTH VR SHOWCASE (HOME PAGE SPECIFIC) */}
      <section className="home-vr-section">
        <div className="home-vr-header">
          <h2 className="tech-heading-large text-yellow shadow-text">IMMERSIVE VR</h2>
          <p className="tech-subheading">STEP INSIDE OUR ARCHITECTURAL VISUALIZATIONS</p>
        </div>
        <div className="full-vr-container">
          <Suspense fallback={null}>
            <PanoramaViewer imagePath="/my_work/360,VR/Panorama6_000.jpg" />
          </Suspense>
        </div>
      </section>

      {/* 4.5 FEATURED STILLS GALLERY */}
      <section className="featured-renders section-padding container">
        <div className="text-center mb-16">
          <h2 className="tech-heading-large text-yellow">FEATURED STILLS</h2>
          <p className="tech-body mt-4">A curated selection from our cinematic lighting and concept art tests.</p>
        </div>
        <div className="renders-grid">
          <div className="render-item animate-slide-up delay-100">
            <img src="/my_work/STYLE/shot04861.png" alt="Render 1" />
            <div className="render-overlay">
              <span className="view-text">VIEW PROJECT</span>
            </div>
          </div>
          <div className="render-item animate-slide-up delay-200">
            <img src="/my_work/STYLE/shot05599.png" alt="Render 2" />
            <div className="render-overlay">
              <span className="view-text">VIEW PROJECT</span>
            </div>
          </div>
          <div className="render-item animate-slide-up delay-300">
            <img src="/my_work/STYLE/sun_set004.png" alt="Render 3" />
            <div className="render-overlay">
              <span className="view-text">VIEW PROJECT</span>
            </div>
          </div>
          <div className="render-item animate-slide-up delay-100">
            <img src="/my_work/STYLE/010.png" alt="Render 4" />
            <div className="render-overlay">
              <span className="view-text">VIEW PROJECT</span>
            </div>
          </div>
          <div className="render-item animate-slide-up delay-200">
            <img src="/my_work/CINEMATIC/full_shot899.png" alt="Render 5" />
            <div className="render-overlay">
              <span className="view-text">VIEW PROJECT</span>
            </div>
          </div>
          <div className="render-item animate-slide-up delay-300">
            <img src="/my_work/CINEMATIC/first_shot000.png" alt="Render 6" />
            <div className="render-overlay">
              <span className="view-text">VIEW PROJECT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MASTERPIECE SECTION (03_logo_.mp4) */}
      <section className="home-masterpiece-section">
        <div className="masterpiece-bg">
          <video 
            src="/my_work/logo/03_logo_.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="none"
          />
          <div className="masterpiece-overlay"></div>
        </div>
        
        <div className="masterpiece-content container">
          <h2 className="tech-heading-large text-yellow">THE MASTERPIECE</h2>
          <p className="tech-subheading">WITNESS OUR FULL SPECTRUM OF CAPABILITIES</p>
          <div className="masterpiece-stats">
            <div className="stat-box">
              <span className="stat-num">500+</span>
              <span className="stat-label">PROJECTS</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">14</span>
              <span className="stat-label">YEARS</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">50M+</span>
              <span className="stat-label">VIEWS</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
