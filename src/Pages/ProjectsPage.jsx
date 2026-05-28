import React, { useRef } from 'react';
import PageHero from '../Components/PageHero';
import { FloatingShards } from '../Components/ThreeEffects';
import PortfolioGrid from '../Components/PortfolioGrid';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import './ProjectsPage.css';

// Extra 3D Effect for Projects Page
const FloatingIcosahedron = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2, 0]}>
      <meshBasicMaterial color="#ff0000" wireframe />
    </Icosahedron>
  );
};

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <PageHero 
        title="OUR"
        subtitle="WORK"
        videoSrc="/my_work/sadhu_fight/monster_face.mp4"
        effect={FloatingShards}
        metaText="VFX &middot; CGI &middot; MOTION"
      />
      
      <section className="extra-3d-section section-padding">
        <div className="container text-center">
          <h2 className="tech-heading text-yellow mb-8">INTERACTIVE PORTFOLIO</h2>
          <p className="tech-body mb-10 max-w-3xl mx-auto">
            Explore our curated selection of high-end visual effects, 3D animations, and architectural visualizations. We push the boundaries of real-time rendering and cinematic production to deliver unparalleled visual fidelity.
          </p>
          <div className="projects-3d-canvas-container mx-auto mb-10">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <FloatingIcosahedron />
            </Canvas>
          </div>
        </div>
      </section>

      {/* FULL ARCHIVE GRID */}
      <PortfolioGrid />
      
      <section className="project-workflow-section section-padding container text-center">
         <h2 className="tech-heading text-yellow mb-6">THE PIPELINE</h2>
         <div className="workflow-grid">
            <div className="workflow-card">
               <h3 className="text-yellow">PRE-PRODUCTION</h3>
               <p className="tech-body">Concept art, storyboarding, and previz to establish the creative vision.</p>
            </div>
            <div className="workflow-card">
               <h3 className="text-yellow">PRODUCTION</h3>
               <p className="tech-body">High-fidelity 3D modeling, texturing, animation, and motion capture.</p>
            </div>
            <div className="workflow-card">
               <h3 className="text-yellow">POST-PRODUCTION</h3>
               <p className="tech-body">Compositing, color grading, and final render optimization for delivery.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
