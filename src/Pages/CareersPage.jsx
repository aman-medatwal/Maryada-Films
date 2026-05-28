import React from 'react';
import PageHero from '../Components/PageHero';
import { MatrixRain } from '../Components/ThreeEffects';
import './NewPages.css';

const CareersPage = () => {
  return (
    <div className="careers-page">
      <PageHero 
        title="JOIN THE"
        subtitle="CREW"
        videoSrc="/my_work/CINEMATIC/half robo.mp4"
        effect={MatrixRain}
        metaText="WE ARE ALWAYS LOOKING FOR TOP TALENT"
      />
      
      <section className="careers-content section-padding container">
        <div className="careers-header text-center mb-10">
          <h2 className="tech-heading-large text-yellow">OPEN DIRECTIVES</h2>
          <p className="tech-body mx-auto mt-4" style={{maxWidth: '700px'}}>
            We are building the next generation of cinematic visual effects. If you have a passion for pushing the boundaries of what is possible in CGI, animation, and compositing, transmit your credentials below.
          </p>
        </div>

        <div className="job-listings">
          <div className="job-card glass animate-slide-up delay-100">
            <h3 className="text-yellow">SENIOR VFX COMPOSITOR</h3>
            <p className="tech-body mt-2">Location: Mumbai / Remote</p>
            <p className="tech-body mt-2 text-secondary" style={{fontSize: '0.85rem'}}>Expertise required in Nuke, After Effects, and handling high-end feature film compositing pipelines.</p>
            <button className="btn-tech-solid mt-4">APPLY NOW</button>
          </div>
          <div className="job-card glass animate-slide-up delay-200">
            <h3 className="text-yellow">3D ANIMATOR (Unreal Engine)</h3>
            <p className="tech-body mt-2">Location: Mumbai</p>
            <p className="tech-body mt-2 text-secondary" style={{fontSize: '0.85rem'}}>Looking for animators experienced with Unreal Engine 5, motion capture cleanup, and cinematic sequencing.</p>
            <button className="btn-tech-solid mt-4">APPLY NOW</button>
          </div>
          <div className="job-card glass animate-slide-up delay-300">
            <h3 className="text-yellow">TECHNICAL DIRECTOR (TD)</h3>
            <p className="tech-body mt-2">Location: Remote</p>
            <p className="tech-body mt-2 text-secondary" style={{fontSize: '0.85rem'}}>Python scripting, Maya tool development, and pipeline optimization experience required.</p>
            <button className="btn-tech-solid mt-4">APPLY NOW</button>
          </div>
        </div>

        <div className="application-form mt-16 glass" style={{padding: '40px'}}>
          <h3 className="text-yellow mb-6 text-center">TRANSMIT CREDENTIALS (SPONTANEOUS APPLICATION)</h3>
          <form className="tech-form" style={{maxWidth: '600px', margin: '0 auto'}}>
            <div className="form-group">
              <label>OPERATIVE NAME</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>COMMLINK (EMAIL)</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>PORTFOLIO UPLINK (URL)</label>
              <input type="url" placeholder="Link to your showreel/ArtStation" />
            </div>
            <div className="form-group">
              <label>SPECIALIZATION</label>
              <select style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,170,0,0.3)'}}>
                <option>3D Animation</option>
                <option>VFX Compositing</option>
                <option>Lighting / Rendering</option>
                <option>Concept Art</option>
                <option>Other</option>
              </select>
            </div>
            <button type="button" className="btn-tech-solid w-full mt-4">SUBMIT APPLICATION</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
