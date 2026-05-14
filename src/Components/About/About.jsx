import React from 'react'
import { FiAperture, FiCpu, FiTarget, FiZap } from 'react-icons/fi'
import './About.css'

const About = () => {
  const strengths = [
    { icon: <FiCpu />, title: 'Tools & Technologies', text: 'Blender, Unreal Engine, Twinmotion, D5 Render, After Effects and Adobe Premiere.' },
    { icon: <FiAperture />, title: 'CGI & Animation', text: '3D/2D animation, motion graphics, character rigging and cinematic production.' },
    { icon: <FiTarget />, title: 'Architecture Visualization', text: 'Interior and exterior design, walkthrough animation and real-time visualization.' },
    { icon: <FiZap />, title: 'Experience Highlights', text: '6+ years in CGI and AR/VR, 12+ artists led and 30+ major projects delivered.' },
  ]

  return (
    <main className='about page-surface'>
      <section className='container page-hero'>
        <div className='row align-items-center'>
          <div className='col-lg-7'>
            <p className='page-kicker'>About Us</p>
            <h1>Maryada Films is a creative studio for CGI, AR/VR and animation.</h1>
            <p>
              MARYADA FILMS is a creative studio specializing in high-quality
              CGI, AR/VR, animation, 2D motion and real-time visual experiences.
            </p>
          </div>
          <div className='col-lg-5 mt-4 mt-lg-0'>
            <div className='page-image-placeholder'>
              <span>Founder / Studio Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section className='container pb-5'>
        <div className='row align-items-stretch'>
          <div className='col-lg-5 mb-4 mb-lg-0'>
            <div className='about-panel h-100'>
              <h2>Immersive 2D and 3D visuals for films, games, architecture and digital media.</h2>
              <p>
                We craft immersive 2D and 3D visuals using advanced tools such
                as Blender, Twinmotion, D5 Render and Unreal Engine. Led by a
                Senior 3D Artist and Visualizer with 6+ years of experience, we
                deliver cinematic storytelling backed by strong technical
                expertise and precision.
              </p>
            </div>
          </div>
          <div className='col-lg-7'>
            <div className='row'>
              {strengths.map((item) => (
                <div className='col-md-6 mb-4' key={item.title}>
                  <article className='about-card h-100'>
                    <span>{item.icon}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
