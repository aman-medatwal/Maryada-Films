import React, { useEffect, useRef } from 'react';
import './VideoBackground.css';

const VideoBackground = ({ src, poster, overlay = true, children }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Auto-play was prevented. user interaction needed", error);
      });
    }
  }, [src]);

  return (
    <div className="video-background-container">
      <video
        ref={videoRef}
        className="video-background"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
      />
      {overlay && <div className="video-overlay"></div>}
      <div className="video-content">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
