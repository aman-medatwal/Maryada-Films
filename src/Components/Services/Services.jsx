import React from 'react'
import { FiBox, FiCamera, FiCpu, FiFilm, FiLayers, FiPrinter, FiSmartphone, FiZap } from 'react-icons/fi'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <FiCpu />,
      title: 'Game & AR/VR',
      text: 'Game environment design, AR/VR experiences, interactive real-time projects and game development.',
    },
    {
      icon: <FiBox />,
      title: 'Design & Production',
      text: 'Modeling, texturing, lighting, rendering, video editing and post production.',
    },
    {
      icon: <FiFilm />,
      title: 'CGI & Animation',
      text: '3D/2D animation for films, ads and cinematics, plus 2D motion graphics and character rigging.',
    },
    {
      icon: <FiCamera />,
      title: 'Architecture Visualization',
      text: 'Interior and exterior design, walkthrough animation and real-time visualization.',
    },
    {
      icon: <FiPrinter />,
      title: '3D Printing',
      text: '3D models, high-quality prototyping and print-ready STL / OBJ files.',
    },
    {
      icon: <FiSmartphone />,
      title: 'Instagram',
      text: 'Creative reel creation, smooth professional editing and content optimized for reach and engagement.',
    },
    {
      icon: <FiLayers />,
      title: 'Tools & Technologies',
      text: 'Blender, Unreal Engine, Twinmotion, D5 Render, After Effects and Adobe Premiere.',
    },
    {
      icon: <FiZap />,
      title: '2D / 3D Cinematics',
      text: 'Cinematic short films, trailers, CGI ads, product animations, environment and world building.',
    },
  ]

  return (
    <main className='services page-surface'>
      <section className='container page-hero'>
        <div className='row align-items-center'>
          <div className='col-lg-7'>
            <p className='page-kicker'>Our Services</p>
            <h1>CGI, animation, AR/VR, design and real-time visualization.</h1>
            <p>
              Maryada Films delivers high-quality CGI, animation, 2D motion,
              game environments, architecture visualization, 3D printing assets
              and real-time visual experiences.
            </p>
          </div>
          <div className='col-lg-5 mt-4 mt-lg-0'>
            <div className='services-placeholder'>
              <span>Services Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section className='container pb-5'>
        <div className='row'>
          {services.map((service) => (
            <div className='col-md-6 col-lg-4 mb-4' key={service.title}>
              <article className='services-card h-100'>
                <span>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Services
