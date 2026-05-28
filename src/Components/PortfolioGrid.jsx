import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { FiPlay, FiImage } from 'react-icons/fi';
import ThreeEffectCanvas, { ParticleField } from './ThreeEffects';
import './PortfolioGrid.css';

const PortfolioGrid = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [items, setItems] = useState([]);

  const categories = ['ALL', ...Object.keys(portfolioData)];

  useEffect(() => {
    let allItems = [];
    if (activeCategory === 'ALL') {
      Object.keys(portfolioData).forEach(category => {
        const categoryItems = portfolioData[category].map(item => ({ ...item, category }));
        allItems = [...allItems, ...categoryItems];
      });
    } else {
      allItems = portfolioData[activeCategory].map(item => ({ ...item, category: activeCategory }));
    }
    
    // Shuffle or sort if needed, here we just use the loaded order
    setItems(allItems);
  }, [activeCategory]);

  return (
    <section className="portfolio-grid-section section-padding container" style={{position: 'relative'}}>
      {/* 3D Background */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3, zIndex: 0, pointerEvents: 'none'}}>
        <ThreeEffectCanvas effect={ParticleField} />
      </div>

      <div className="text-center mb-12" style={{position: 'relative', zIndex: 2}}>
         <h2 className="tech-heading-large text-yellow">FULL ARCHIVE</h2>
         <p className="tech-body mt-2">Explore our complete database of renders, simulations, and interactive media.</p>
      </div>

      <div className="portfolio-filters mb-12">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="carousel-scene">
        <div key={activeCategory} className="carousel-track" style={{ '--total-items': items.length }}>
          {items.map((item, index) => {
            const angle = (360 / items.length) * index;
            // Calculate radius safely, keeping a fixed radius of 800 for small amounts of items
            let radius = 800;
            if (items.length > 6) {
              radius = Math.max(800, (300 / 2) / Math.tan(Math.PI / items.length));
            }
            
            return (
              <div 
                key={`${item.filename}-${index}`} 
                className="carousel-card"
                style={{ 
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                }}
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play().catch(() => {});
                  // Pause carousel on hover
                  e.currentTarget.parentElement.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.pause();
                  // Resume carousel
                  e.currentTarget.parentElement.style.animationPlayState = 'running';
                }}
              >
                <div className="grid-media-wrapper">
                  {item.type === 'video' ? (
                    <video 
                      src={item.src} 
                      muted 
                      loop 
                      playsInline 
                      preload="metadata"
                      className="grid-media"
                    />
                  ) : (
                    <img src={item.src} alt={item.filename} className="grid-media" />
                  )}
                  
                  <div className="grid-overlay">
                    <div className="grid-icon">
                        {item.type === 'video' ? <FiPlay /> : <FiImage />}
                    </div>
                    <div className="grid-meta">
                        <span className="grid-cat text-yellow">{item.category.replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
