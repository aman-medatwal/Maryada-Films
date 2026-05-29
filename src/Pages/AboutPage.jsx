import React, { useRef } from 'react';
import PageHero from '../Components/PageHero';
import { WireframeGlobe, KineticTorus } from '../Components/ThreeEffects';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import './AboutPage.css';

// Extra 3D Effect for About Page content
const FloatingText3D = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Center>
        <Text3D 
          font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
          size={1}
          height={0.2}
          curveSegments={12}
        >
          MARYADA
          <meshStandardMaterial color="#ffaa00" wireframe />
        </Text3D>
      </Center>
    </group>
  );
};

const AboutPage = () => {
  return (
    <div className="about-page">
      <PageHero 
        title="ABOUT"
        subtitle="THE STUDIO"
        videoSrc="/my_work/CINEMATIC/citysample.mp4"
        effect={WireframeGlobe}
        metaText="EST. 2010 &middot; MUMBAI"
      />
      
      <section className="about-content section-padding container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="tech-heading text-yellow mb-6">WE BUILD WORLDS</h2>
            <p className="tech-body mb-4">
              Maryada Films is a premier visual effects and animation studio dedicated to pushing the boundaries of cinematic storytelling.
            </p>
            <p className="tech-body mb-4">
              With a foundation in 3D animation, architectural visualization, and motion graphics, we engineer visual experiences that leave lasting impressions.
            </p>
          </div>
          
          <div className="about-3d-canvas-container">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#ffaa00" />
              <FloatingText3D />
            </Canvas>
          </div>
        </div>
      </section>

      {/* NEW BEHIND THE SCENES SECTION */}
      <section className="bts-section section-padding container">
        <div className="text-center mb-12">
          <h2 className="tech-heading text-yellow">STUDIO INFRASTRUCTURE</h2>
          <p className="tech-body mt-2">State-of-the-art rendering farms and motion capture facilities.</p>
        </div>
        <div className="bts-banner">
          <img src="/my_work/STYLE/015.png" alt="Behind the Scenes" style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(255, 170, 0, 0.2)', filter: 'brightness(0.8)'}} />
        </div>
      </section>

      {/* OUR PHILOSOPHY SECTION */}
      <section className="philosophy-section section-padding container">
        <div className="philosophy-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px'}}>
          <div className="philosophy-card glass" style={{padding: '30px', borderRadius: '12px'}}>
            <h3 className="text-yellow mb-4 text-xl">01. VISIONARY DIRECTING</h3>
            <p className="tech-body text-secondary">We don't just render pixels; we craft cinematic narratives. Every camera angle and lighting setup is meticulously planned to evoke emotion.</p>
          </div>
          <div className="philosophy-card glass" style={{padding: '30px', borderRadius: '12px'}}>
            <h3 className="text-yellow mb-4 text-xl">02. TECHNICAL EXCELLENCE</h3>
            <p className="tech-body text-secondary">Our pipeline utilizes the latest in real-time rendering, AI-assisted rotoscoping, and procedural generation to deliver impossible deadlines.</p>
          </div>
          <div className="philosophy-card glass" style={{padding: '30px', borderRadius: '12px'}}>
            <h3 className="text-yellow mb-4 text-xl">03. ARTISTIC INTEGRITY</h3>
            <p className="tech-body text-secondary">Despite our heavy reliance on technology, the core of our studio remains the traditional artists who understand composition, color, and form.</p>
          </div>
        </div>
      </section>

      {/* NEW CREATIVE ENGINE SECTION */}
      <section className="creative-engine-section section-padding container">
        <div className="engine-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px', alignItems: 'center'}}>
          <div className="engine-text">
            <h2 className="tech-heading text-yellow mb-6">THE CREATIVE ENGINE</h2>
            <p className="tech-body mb-4 text-secondary">
              Our workflow is a perfect symphony of art and technology. From initial storyboarding to final multi-pass rendering, our pipeline is designed for ultimate efficiency without sacrificing creative fidelity.
            </p>
            <p className="tech-body mb-8 text-secondary">
              We leverage procedural modeling, AI-assisted physics simulations, and a highly scalable cloud rendering farm to deliver breathtaking visuals on time and beyond expectations.
            </p>
            <button className="btn-primary">DISCOVER OUR PIPELINE</button>
          </div>
          <div className="engine-canvas glass" style={{height: '450px', width: '100%', borderRadius: '16px', position: 'relative', overflow: 'hidden'}}>
             <Canvas camera={{ position: [0, 0, 6] }}>
               <ambientLight intensity={0.5} />
               <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffaa00" />
               <pointLight position={[-10, -10, -10]} color="#00ffcc" intensity={0.5} />
               <KineticTorus />
             </Canvas>
          </div>
        </div>
      </section>
      
      <section className="about-stats-section section-padding">
         <div className="container">
            <div className="stats-grid">
               <div className="stat-card">
                  <h3 className="stat-num text-yellow">100+</h3>
                  <p className="stat-label">BRANDS TRUST US</p>
               </div>
               <div className="stat-card">
                  <h3 className="stat-num text-yellow">45</h3>
                  <p className="stat-label">INDUSTRY AWARDS</p>
               </div>
               <div className="stat-card">
                  <h3 className="stat-num text-yellow">30+</h3>
                  <p className="stat-label">CREATIVE EXPERTS</p>
               </div>
               <div className="stat-card">
                  <h3 className="stat-num text-yellow">24/7</h3>
                  <p className="stat-label">GLOBAL SUPPORT</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
