import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import './GalleryGrid.css';

const GalleryGrid = () => {
  const categories = Object.keys(portfolioData);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (activeCategory && portfolioData[activeCategory]) {
      setItems(portfolioData[activeCategory]);
    }
  }, [activeCategory]);

  return (
    <div className="gallery-container">
      <div className="gallery-filters animate-fade-in delay-100">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="gallery-grid animate-slide-up delay-200">
        {items.map((item, index) => (
          <div key={index} className="gallery-item glass">
            {item.type === 'video' ? (
              <video 
                src={item.src} 
                className="gallery-media" 
                muted 
                loop 
                preload="none"
                poster="" // Could add a generic poster here
                onMouseOver={e => e.target.play()} 
                onMouseOut={e => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            ) : item.type === 'image' ? (
              <img src={item.src} alt={item.filename} className="gallery-media" loading="lazy" />
            ) : (
              <div className="document-placeholder">
                <p>{item.filename}</p>
              </div>
            )}
            <div className="gallery-overlay">
              <p className="item-title">{item.filename.split('.')[0].replace(/_/g, ' ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
