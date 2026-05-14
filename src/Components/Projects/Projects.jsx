import React from 'react'
import { FiCamera, FiMonitor, FiPlayCircle } from 'react-icons/fi'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      icon: <FiPlayCircle />,
      title: '2D / 3D Cinematic Short Film & Trailer',
      type: 'Cinematics',
      text: 'Short film and trailer production for Pocket Hikayat, ISCCM Hospital, Forma Helmet and Jivan Ji Maharaj.',
    },
    {
      icon: <FiMonitor />,
      title: 'Virtual Home Experience VR',
      type: 'Unreal Engine',
      text: 'Real-time VR experience built for Windows and Android using Unreal Engine.',
    },
    {
      icon: <FiCamera />,
      title: 'CGI Ads, Reels and Product Animations',
      type: 'Digital Media',
      text: 'Instagram reels, posts, CGI ads, product animations, environment stories and world building.',
    },
  ]

  return (
    <main className='projects page-surface'>
      <section className='container page-hero'>
        <div className='row align-items-center'>
          <div className='col-lg-7'>
            <p className='page-kicker'>Experience Highlights</p>
            <h1>Selected work across films, games, ads, VR and visualization.</h1>
            <p>
              Maryada Films has worked on games, short films, commercial ads,
              architectural exterior and interior visualization, virtual home
              experiences, Instagram CGI content and environment world building.
            </p>
          </div>
          <div className='col-lg-5 mt-4 mt-lg-0'>
            <div className='project-feature-placeholder'>
              <span>Featured Project Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section className='container pb-5'>
        <div className='row'>
          {projects.map((project, index) => (
            <div className='col-lg-4 mb-4' key={project.title}>
              <article className='project-card h-100'>
                <div className='project-thumb'>
                  <span>Image Placeholder</span>
                </div>
                <div className='project-body'>
                  <div className='project-meta'>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {project.icon}
                  </div>
                  <p>{index === 0 ? `Featured • ${project.type}` : project.type}</p>
                  <h3>{project.title}</h3>
                  <small>{project.text}</small>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Projects
