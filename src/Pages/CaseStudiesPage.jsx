import React from 'react';
import PageHero from '../Components/PageHero';
import { InteractiveGrid } from '../Components/ThreeEffects';
import './NewPages.css';

const CaseStudiesPage = () => {
  return (
    <div className="case-studies-page">
      <PageHero 
        title="CASE"
        subtitle="STUDIES"
        videoSrc="/my_work/CINEMATIC/moon_space_secen.mp4"
        effect={InteractiveGrid}
        metaText="DECONSTRUCTING THE IMPOSSIBLE"
      />
      
      <section className="case-studies-content section-padding container">
        <div className="text-center mb-16">
          <h2 className="tech-heading-large text-yellow">OUR BEST WORK DECONSTRUCTED</h2>
          <p className="tech-body mx-auto mt-4" style={{maxWidth: '800px'}}>
            Dive deep into the technical pipelines and creative decisions behind some of our most challenging sequences. From fluid simulations to full CG environments.
          </p>
        </div>

        <div className="case-study-card glass mb-12">
          <div className="case-study-video">
            <video src="/my_work/CINEMATIC/waterfall_render.mp4" autoPlay loop muted playsInline preload="metadata"></video>
          </div>
          <div className="case-study-details">
            <h3 className="text-yellow text-2xl mb-2">FLUID DYNAMICS: THE FALL</h3>
            <div className="tech-badges mb-4">
              <span className="badge">Houdini</span>
              <span className="badge">Mantra</span>
              <span className="badge">Nuke</span>
            </div>
            <p className="tech-body text-secondary">
              Creating a photorealistic waterfall required millions of simulated particles and complex whitewater meshing. We optimized the render times by breaking the simulation into distinct caching layers.
            </p>
          </div>
        </div>

        <div className="case-study-card glass mb-12 reverse">
          <div className="case-study-video">
            <video src="/my_work/CINEMATIC/wolf.mp4" autoPlay loop muted playsInline preload="metadata"></video>
          </div>
          <div className="case-study-details">
            <h3 className="text-yellow text-2xl mb-2">CREATURE GROOMING: ALPHA</h3>
            <div className="tech-badges mb-4">
              <span className="badge">Maya</span>
              <span className="badge">XGen</span>
              <span className="badge">Arnold</span>
            </div>
            <p className="tech-body text-secondary">
              Generating lifelike fur dynamics for a fast-moving creature in a night scene required custom grooming scripts and intensive sub-surface scattering tests to achieve the perfect moonlight bounce.
            </p>
          </div>
        </div>
        
        <div className="case-study-card glass mb-12">
          <div className="case-study-video">
            <video src="/my_work/STYLE/high_beach_.mp4" autoPlay loop muted playsInline preload="metadata"></video>
          </div>
          <div className="case-study-details">
            <h3 className="text-yellow text-2xl mb-2">ENVIRONMENTAL: COASTAL HIGHWAY</h3>
            <div className="tech-badges mb-4">
              <span className="badge">Unreal Engine 5</span>
              <span className="badge">Quixel Megascans</span>
              <span className="badge">Lumen</span>
            </div>
            <p className="tech-body text-secondary">
              A fully real-time environment built to stress-test Lumen global illumination. The entire coastline was procedurally generated using custom terrain shaders.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default CaseStudiesPage;
