import React, { useState, useRef } from 'react';
import { FiPlay, FiImage } from 'react-icons/fi';
import './HorizontalShowcase.css';

const categories = ['ALL', 'ANIMATION', 'VFX', 'ARCH VIZ', '360/VR', 'CGI', 'HIKAYAT'];

const showcaseItems = [
  {
    id: 1,
    title: "THE HORIZON",
    category: "ANIMATION",
    type: "video",
    src: "/my_work/CINEMATIC/citysample.mp4",
    poster: "/my_work/CINEMATIC/016.png",
  },
  {
    id: 2,
    title: "SADHU CONCEPT",
    category: "VFX",
    type: "image",
    src: "/my_work/sadhu_fight/029.png",
  },
  {
    id: 3,
    title: "RESIDENTIAL PLOTS",
    category: "ARCH VIZ",
    type: "video",
    src: "/my_work/360,VR/VR_Android.mp4",
    poster: "/my_work/Architectural Visualization/01_room.png",
  },
  {
    id: 4,
    title: "COASTAL HIGHWAY",
    category: "CINEMATIC",
    type: "video",
    src: "/my_work/CINEMATIC/wolf.mp4",
    poster: "",
  },
  {
    id: 5,
    title: "VR BANGLOW",
    category: "360/VR",
    type: "image",
    src: "/my_work/360,VR/Panorama1_000.jpg",
  },
  {
    id: 6,
    title: "CGI BOOK",
    category: "CGI",
    type: "video",
    src: "/my_work/CGI/bookfiled.mp4",
    poster: "",
  },
  {
    id: 7,
    title: "SNOW CITY",
    category: "CINEMATIC",
    type: "image",
    src: "/my_work/CINEMATIC/snow449.png",
  },
  {
    id: 8,
    title: "NIGHT CITY",
    category: "ANIMATION",
    type: "video",
    src: "/my_work/CINEMATIC/IMG_0876.MP4",
    poster: "/my_work/CINEMATIC/021.png",
  }
];

const HorizontalShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const scrollContainerRef = useRef(null);

  const filteredItems = activeCategory === 'ALL' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === activeCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <section className="horizontal-showcase">
      {/* Category Nav */}
      <div className="showcase-nav container">
        <div className="category-list">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {activeCategory === cat && (
                <div className="active-dot">
                  <div className="dot-inner"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="scroll-wrapper">
        <div className="scroll-container" ref={scrollContainerRef}>
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="showcase-card"
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play().catch(err => console.log("Video play interrupted", err));
                }
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                }
              }}
            >
              <div className="card-media-wrapper">
                {item.type === 'video' ? (
                  <video 
                    className="card-media"
                    src={item.src}
                    poster={item.poster}
                    muted
                    loop
                    preload="metadata"
                  />
                ) : (
                  <img src={item.src} alt={item.title} className="card-media" />
                )}
                
                {/* Overlay UI */}
                <div className="card-overlay">
                  <div className="card-overlay-center">
                    <div className="card-play-btn">
                      {item.type === 'video' ? <FiPlay /> : <FiImage />}
                    </div>
                  </div>
                  <div className="card-meta">
                    <span className="card-category text-yellow">{item.category}</span>
                    <h3 className="card-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="empty-state">No items in this category.</div>
          )}
        </div>
        
        {/* Custom scroll navigation dots */}
        <div className="scroll-nav right" onClick={scrollRight}>
          <div className="nav-dot">
            <div className="nav-dot-inner"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
