import React from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import './Contact.css'

const Contact = () => {
  return (
    <main className='contact page-surface'>
      <section className='container page-hero'>
        <div className='row align-items-center'>
          <div className='col-lg-7'>
            <p className='page-kicker'>Start a Project</p>
            <h1>Contact Maryada Films</h1>
            <p>
              Connect with Maryada Films for CGI, AR/VR, animation, real-time
              visualization, architectural walkthroughs and cinematic
              production.
            </p>
          </div>
          <div className='col-lg-5 mt-4 mt-lg-0'>
            <div className='contact-blank'>
              <span>Visions to Reality Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section className='container pb-5'>
        <div className='row'>
          <div className='col-lg-5 mb-4 mb-lg-0'>
            <div className='contact-info h-100'>
              <div className='info-item'>
                <FiMail />
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:maryadafilms@gmail.com">maryadafilms@gmail.com</a></p>
                </div>
              </div>
              <div className='info-item'>
                <FiPhone />
                <div>
                  <h3>Phone</h3>
                  <p><a href="tel:+918302736672">+91 8302736672</a></p>
                </div>
              </div>
              <div className='info-item'>
                <FiMapPin />
                <div>
                  <h3>Creative Head</h3>
                  <p>Arpan Dixit, 3D Artist | Visualizer</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-7'>
            <div className='contact-form'>
              <form>
                <div className='form-row'>
                  <div className='col-md-6 mb-3'>
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <input type="email" placeholder="Your Email" required />
                  </div>
                </div>
                <input type="text" placeholder="Project Type" />
                <textarea placeholder="Tell us about your project" rows="6" required></textarea>
                <button type="submit" className='submit-btn'>
                  Send Message <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
