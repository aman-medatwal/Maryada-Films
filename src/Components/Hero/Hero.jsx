import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import video from "../../assets/logo.mp4";
import {
  FiArrowRight,
  FiAward,
  FiBox,
  FiCheckCircle,
  FiFilm,
  FiLayers,
  FiUsers,
} from "react-icons/fi";

const Hero = () => {
  const capabilities = [
    { icon: <FiFilm />, title: "CGI & Animation", text: "3D/2D animation for films, ads, cinematics, motion graphics and character animation." },
    { icon: <FiBox />, title: "Game & AR/VR", text: "Game environments, AR/VR experiences and interactive real-time projects." },
    { icon: <FiLayers />, title: "Architecture Visualization", text: "Interior, exterior, walkthrough animation and real-time visualization." },
    { icon: <FiUsers />, title: "Design & Production", text: "Modeling, texturing, lighting, rendering, video editing and post production." },
  ];

  const process = [
    "6+ years in CGI, animation and AR/VR",
    "Led a team of 12+ artists",
    "Delivered 30+ major projects",
    "Worked on games, short films and commercial ads",
  ];

  return (
    <main className="home-page">
      <section className="hero d-flex align-items-center" id="showreel">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="container hero-container">
          <div className="row align-items-end">
            <div className="col-lg-7">
              <p className="eyebrow bordered">Imagination to Reality</p>
              <h1>From <span>Imagination</span> to Reality</h1>
              <p className="hero-copy">
                Maryada Films is a creative studio specializing in high-quality
                CGI, AR/VR, animation, 2D motion and real-time visual
                experiences.
              </p>
              <div className="hero-actions d-flex flex-wrap">
                <Link className="primary-action" to="/projects">
                  Watch Showreel <FiArrowRight />
                </Link>
                <Link className="secondary-action" to="/contact">
                  Explore Works
                </Link>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 mt-5 mt-lg-0">
              <div className="hero-info-card">
                <FiAward />
                <span>6+ Years Experience</span>
                <p>Led by a Senior 3D Artist and Visualizer delivering cinematic storytelling with technical precision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad works-preview">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-5">
              <h2>Experience<br />Highlights</h2>
              <div className="title-line" />
            </div>
            <div className="col-lg-5 offset-lg-2 mt-3 mt-lg-4">
              <p>Delivered across games, short films, commercial ads, CGI reels, architecture visualization and real-time experiences.</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="work-placeholder wide">
                <span>Project Image Placeholder</span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="work-placeholder wide">
                <span>Project Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad studio-story">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>About Maryada Films</h2>
              <p>
                We craft immersive 2D and 3D visuals for films, games,
                architecture and digital media using advanced tools such as
                Blender, Twinmotion, D5 Render and Unreal Engine.
              </p>
              <Link className="text-link" to="/about">
                Learn Our Process <FiArrowRight />
              </Link>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="tilt-frame">
                <div className="studio-placeholder">
                  <span>Studio Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad services-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Our Services</p>
            <h2>CGI, animation, AR/VR and real-time visual experiences.</h2>
          </div>
          <div className="row">
            {capabilities.map((item) => (
              <div className="col-md-6 col-lg-3 mb-4" key={item.title}>
                <article className="service-card h-100">
                  <span className="icon-box">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad process-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="section-kicker">Experience Highlights</p>
              <h2>Production experience backed by tools and team leadership.</h2>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="process-list">
                {process.map((item) => (
                  <div className="process-item" key={item}>
                    <FiCheckCircle />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};


export default Hero;
