import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import GlobalLogo from './Components/GlobalLogo';
import Home from './Pages/Home';
import AboutPage from './Pages/AboutPage';
import ProjectsPage from './Pages/ProjectsPage';
import ContactPage from './Pages/ContactPage';
import ServicesPage from './Pages/ServicesPage';
import CareersPage from './Pages/CareersPage';
import CaseStudiesPage from './Pages/CaseStudiesPage';
import CustomCursor from './Components/CustomCursor';

const App = () => {
  return (
    <Router>
      <CustomCursor />
      <Navbar />
      <GlobalLogo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/start-project" element={<ContactPage />} />
        <Route path="/contact" element={<Navigate to="/start-project" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
