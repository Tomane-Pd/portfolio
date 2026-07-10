// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ArrowUp
} from 'lucide-react'
import '../styles/Footer.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Tomane Mateus Tomane</h3>
            <p>
              Data Scientist | MEAL Specialist | ML & AI Enthusiast
            </p>
            <p className="footer-tagline">
              Transforming complex data into actionable insights
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={18} />
                <a href="mailto:padacius@gmail.com">padacius@gmail.com</a>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+258840190827">+258 840190827</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>Mozambique</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Me</h4>
            <div className="footer-social">
              <a 
                href="https://github.com/Tomane-Pd" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="mailto:padacius@gmail.com"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tomane Mateus Tomane. 
            Made with <Heart size={16} color="#c0392b" /> in Mozambique
          </p>
          <button 
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer