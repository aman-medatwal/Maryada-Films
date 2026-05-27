import React from 'react';
import GalleryGrid from '../Components/GalleryGrid';

const ProjectsPage = () => {
  return (
    <div className="page-container container section-padding" style={{ marginTop: '80px' }}>
      <div className="section-header text-center">
        <h1 className="section-title animate-slide-up">Our Portfolio</h1>
        <div className="title-separator animate-slide-up delay-100"></div>
        <p className="section-description animate-slide-up delay-200">
          A collection of our finest work across various disciplines. Browse through our categories to see what we can create.
        </p>
      </div>
      
      <GalleryGrid />
    </div>
  );
};

export default ProjectsPage;
