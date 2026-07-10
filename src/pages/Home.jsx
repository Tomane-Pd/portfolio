// src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Award, 
  Briefcase, 
  Code2, 
  BarChart3,
  ChevronRight,
  Sparkles,
  Database,
  Brain,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import '../styles/Home.css'

// Importar imagem de perfil
import profileImage from '/images/profile/profile.jpg'

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  }

  const stats = [
    { 
      icon: <Briefcase size={28} />, 
      value: '5+', 
      label: 'Years Experience',
      description: 'in Data & MEAL'
    },
    { 
      icon: <Code2 size={28} />, 
      value: '15+', 
      label: 'Projects',
      description: 'Completed Successfully'
    },
    { 
      icon: <Award size={28} />, 
      value: '8+', 
      label: 'Certifications',
      description: 'International Recognized'
    },
    { 
      icon: <BarChart3 size={28} />, 
      value: '20+', 
      label: 'Dashboards',
      description: 'Interactive Reports'
    }
  ]

  const services = [
    {
      icon: <Database size={32} />,
      title: 'Data Science & Analytics',
      description: 'Transforming complex data into actionable insights using Python, R, and Machine Learning.'
    },
    {
      icon: <Brain size={32} />,
      title: 'MEAL & Research',
      description: 'Monitoring, Evaluation, Accountability & Learning with evidence-based decision making.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'AI & Machine Learning',
      description: 'Developing predictive models for early warning systems and strategic planning.'
    },
    {
      icon: <Users size={32} />,
      title: 'Capacity Building',
      description: 'Training teams in data collection, analysis, and visualization techniques.'
    }
  ]

  return (
    <div className="home">
      <SEO
        title="Home"
        description="Tomane Mateus Tomane - Data Scientist, MEAL Specialist, and ML & AI Enthusiast transforming complex data into actionable insights for UN agencies and development organizations."
      />
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-text"
            >
              <span className="hero-greeting"> Hello, I'm</span>
              <h1 className="hero-name">Tomane Mateus Tomane</h1>
              <div className="hero-title-container">
                <span className="hero-title">Data Scientist</span>
                <span className="hero-title-separator">|</span>
                <span className="hero-title">MEAL Specialist</span>
                <span className="hero-title-separator">|</span>
                <span className="hero-title">ML & AI Enthusiast</span>
              </div>
              
              <p className="hero-description">
                Agricultural Engineer with an MBA in Data Science & Analytics, 
                transforming complex data into actionable insights for UN agencies, 
                NGOs, and development organizations. Passionate about leveraging 
                AI and Machine Learning to drive evidence-based decision making 
                in humanitarian and development contexts. Proficient in tools such as R, 
                STATA, Python, Excel, ArcGIS, QGIS, and data storytelling, transforming complex 
                information into practical insights that support strategic decision-making. 
                Developer of PMEAL Explorer 360, an integrated platform for project and data 
                management, monitoring and evaluation, GIS, and reporting. 
              </p>

              <blockquote className="hero-quote">
                <Sparkles size={20} className="quote-icon" />
                <span>"Turning data into decisions, insights into impact"</span>
              </blockquote>

              <div className="hero-actions">
                <a 
                  href="/documents/cv/Tomane_Mateus_Tomane_CV.pdf" 
                  download
                  className="btn-primary"
                >
                  <Download size={20} />
                  Download CV
                </a>
                <Link to="/contact" className="btn-secondary">
                  Contact Me
                  <ChevronRight size={20} />
                </Link>
              </div>

              <div className="hero-social">
                <a 
                  href="https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-link"
                >
                  <Linkedin size={22} />
                </a>
                <a 
                  href="https://github.com/Tomane-Pd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="social-link"
                >
                  <Github size={22} />
                </a>
                <a 
                  href="mailto:padacius@gmail.com"
                  aria-label="Email"
                  className="social-link"
                >
                  <Mail size={22} />
                </a>
                <a 
                  href="https://pmeal360.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PMEAL Explorer 360"
                  className="social-link"
                >
                  <Globe size={22} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-image-wrapper"
            >
              <div className="hero-image-container">
                <div className="hero-image-border">
                  <img 
                    src={profileImage} 
                    alt="Tomane Mateus Tomane" 
                    className="hero-image"
                  />
                </div>
                <div className="hero-image-decoration">
                  <div className="decoration-ring"></div>
                  <div className="decoration-dot dot-1"></div>
                  <div className="decoration-dot dot-2"></div>
                  <div className="decoration-dot dot-3"></div>
                </div>
              </div>
              <div className="hero-badge experience-badge animate-float">
                <span className="badge-number">5+</span>
                <span className="badge-label">Years Experience</span>
              </div>
              <div className="hero-badge project-badge animate-float" style={{ animationDelay: '1s' }}>
                <span className="badge-number">15+</span>
                <span className="badge-label">Projects</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll</span>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">What I have done</span>
            <h2 className="section-title">Areas of Expertise</h2>
            <p className="section-subtitle">
              Leveraging data science, AI, and MEAL to drive impact in 
              humanitarian and development sectors
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card"
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>Ready to Transform Data into Impact?</h2>
            <p>
              Let's collaborate on your next project. I'm always open to 
              discussing data science, ML, MEAL, AI, and development initiatives.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">
                Get in Touch
                <ChevronRight size={20} />
              </Link>
              <Link to="/projects" className="btn-secondary">
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home