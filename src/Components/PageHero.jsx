import React, { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import ThreeEffectCanvas from './ThreeEffects';
import './PageHero.css';

const PageHero = ({ title, subtitle, videoSrc, effect, metaText }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="page-hero-section">
      <ThreeEffectCanvas effect={effect} />
      
      <div className={`page-hero-bg-container ${isPlaying ? 'playing' : ''}`}>
        <video 
          className={`page-hero-bg-video ${isPlaying ? 'playing' : ''}`}
          src={videoSrc} 
          autoPlay 
          loop 
          muted={!isPlaying}
          playsInline
        />
        <div className={`page-hero-overlay ${isPlaying ? 'fade-out' : ''}`}></div>
        <div className="grid-overlay"></div>
      </div>

      <div className={`page-hero-content ${isPlaying ? 'fade-out' : ''}`}>
        <h1 className="page-hero-title">
          {title} <span className="text-yellow">{subtitle}</span>
        </h1>
        
        <button 
          className="play-button-tech"
          onClick={() => setIsPlaying(true)}
          aria-label="Play Hero Video"
        >
          <div className="circle-outer"></div>
          <div className="circle-inner"></div>
          <div className="play-icon">
            <FiPlay />
          </div>
          <div className="satellite-dot">
            <div className="dot"></div>
          </div>
        </button>
        
        {metaText && (
          <div className="page-hero-meta">
            {metaText}
          </div>
        )}
      </div>

      {isPlaying && (
        <button 
          className="close-video-btn" 
          onClick={() => setIsPlaying(false)}
        >
          CLOSE SHOWREEL
        </button>
      )}
    </section>
  );
};

export default PageHero;
