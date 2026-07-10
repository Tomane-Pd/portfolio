// src/pages/About.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Target, 
  Heart, 
  Award, 
  Users, 
  MapPin, 
  Calendar,
  Building2,
  Globe,
  Lightbulb,
  TrendingUp,
  Shield,
  Sparkles,
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  BarChart3,
  FileCheck,
  Zap,
  Eye,
  Star
} from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/About.css'

// Importar imagem de perfil
import profileImage from '/images/profile/profile.jpg'

const About = () => {
  // Dados das organizações onde trabalhou
  const organizations = [
    {
      name: 'UNICEF Mozambique',
      role: 'Data & Information Officer',
      period: 'Apr 2024 - Present',
      icon: <Globe size={24} />,
      description: 'Leading data integration and analytics for health and nutrition programs'
    },
    {
      name: 'GiveDirectly',
      role: 'Field Officer & Call Center Agent',
      period: 'Aug 2022 - Dec 2023',
      icon: <Users size={24} />,
      description: 'Managed cash transfer programs for extreme poverty communities'
    },
    {
      name: 'FAO',
      role: 'Qualitative Researcher',
      period: 'Jun 2022 - Jul 2022',
      icon: <FileCheck size={24} />,
      description: 'Conducted qualitative research with farmers in Manica province'
    },
    {
      name: 'ONU-WIDER',
      role: 'Research Assistant',
      period: 'Mar 2022 - May 2022',
      icon: <BarChart3 size={24} />,
      description: 'Researched industrial development trends across 5 provinces'
    }
  ]

  // Dados dos valores profissionais
  const values = [
    {
      icon: <Shield size={28} />,
      title: 'Integrity',
      description: 'Commitment to ethical data practices and transparent reporting'
    },
    {
      icon: <Lightbulb size={28} />,
      title: 'Innovation',
      description: 'Embracing cutting-edge technologies to solve complex problems'
    },
    {
      icon: <Users size={28} />,
      title: 'Impact-Driven',
      description: 'Focused on creating measurable positive change in communities'
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Excellence',
      description: 'Striving for the highest quality in every project and deliverable'
    }
  ]

  // Dados dos interesses de pesquisa
  const researchInterests = [
    'Machine Learning for Early Warning Systems',
    'AI in Public Health & Nutrition',
    'Data-Driven Humanitarian Response',
    'Monitoring & Evaluation Innovations',
    'Geospatial Analysis in Development',
    'Predictive Analytics in Agriculture'
  ]

  // Animações
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="about-page">
      <SEO
        title="About"
        description="Agricultural Engineer with an MBA in Data Science & Analytics, working across UN agencies, NGOs, and development organizations in Mozambique and beyond."
      />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-background"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="about-hero-content"
          >
            <span className="about-hero-badge">About Me</span>
            <h1 className="about-hero-title">Who I Am</h1>
            <p className="about-hero-subtitle">
              Data Scientist, MEAL Specialist, and ML & AI Enthusiast dedicated to
              transforming complex data into actionable insights for development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="profile-section">
        <div className="container">
          <div className="profile-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
              className="profile-image-wrapper"
            >
              <div className="profile-image-container">
                <div className="profile-image-border">
                  <img 
                    src={profileImage} 
                    alt="Tomane Mateus Tomane" 
                    className="profile-image"
                  />
                </div>
                <div className="profile-experience-badge">
                  <span className="badge-number">5+</span>
                  <span className="badge-text">Years of Impact</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              transition={{ duration: 0.6 }}
              className="profile-content"
            >
              <h2 className="profile-title">Tomane Mateus Tomane</h2>
              <p className="profile-role">
                Agricultural Engineer | MBA in Data Science & Analytics
              </p>
              <div className="profile-location">
                <MapPin size={20} />
                <span>Mozambique</span>
              </div>

              <div className="profile-bio">
                <p>
                  I am an Agricultural Engineer with over 5 years of experience in data science, 
                  Monitoring & Evaluation (MEAL), and research. My journey has taken me through 
                  UN agencies, international NGOs, and USAID-funded projects, where I've 
                  transformed complex data into actionable insights for strategic decision-making.
                </p>
                <p>
                  Currently serving as a Data & Information Officer at UNICEF Mozambique, 
                  I develop Python-based data integration solutions and apply Machine Learning 
                  models for early warning systems. I'm also the founder of <strong>PMEAL Explorer 360</strong>, 
                  an integrated platform for project management, MEAL, and data analytics.
                </p>
              </div>

              <div className="profile-actions">
                <Link to="/contact" className="btn-primary">
                  Let's Connect
                  <ChevronRight size={20} />
                </Link>
                <Link to="/projects" className="btn-secondary">
                  View My Work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="mission-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">My Mission</span>
            <h2 className="section-title">Professional Mission & Values</h2>
            <p className="section-subtitle">
              Guided by a clear purpose and strong professional values
            </p>
          </motion.div>

          <div className="mission-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mission-card mission-statement"
            >
              <div className="mission-icon">
                <Target size={36} />
              </div>
              <h3>My Mission</h3>
              <p>
                To leverage data science, Machine Learning, artificial intelligence, and MEAL expertise 
                to drive evidence-based decision-making in humanitarian and development 
                sectors, ultimately creating sustainable impact in communities across Africa.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mission-card career-goals"
            >
              <div className="mission-icon">
                <Star size={36} />
              </div>
              <h3>Career Goals</h3>
              <ul>
                <li>
                  <ChevronRight size={16} />
                  <span>Lead data innovation in international development</span>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <span>Develop AI solutions for humanitarian response</span>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <span>Build capacity in data science across Africa</span>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <span>Advance MEAL practices with emerging technologies</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="values-grid"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="value-card"
              >
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="research-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">Research</span>
            <h2 className="section-title">Research Interests</h2>
            <p className="section-subtitle">
              Areas of academic and professional research focus
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="research-grid"
          >
            {researchInterests.map((interest, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="research-item"
              >
                <div className="research-bullet">
                  <div className="bullet-dot"></div>
                </div>
                <span>{interest}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="organizations-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">Experience</span>
            <h2 className="section-title">Organizations I've Worked With</h2>
            <p className="section-subtitle">
              Collaborating with leading organizations to drive impact
            </p>
          </motion.div>

          <div className="organizations-grid">
            {organizations.map((org, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="organization-card"
              >
                <div className="org-icon">{org.icon}</div>
                <div className="org-content">
                  <h3 className="org-name">{org.name}</h3>
                  <p className="org-role">{org.role}</p>
                  <p className="org-period">
                    <Calendar size={16} />
                    {org.period}
                  </p>
                  <p className="org-description">{org.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="impact-content"
          >
            <div className="impact-header">
              <span className="section-badge">Impact</span>
              <h2 className="section-title">Impact Generated</h2>
            </div>
            
            <div className="impact-grid">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="impact-card"
              >
                <div className="impact-number">95%</div>
                <h4>Efficiency Gain</h4>
                <p>
                  Reduced data aggregation time from weeks to seconds using Python 
                  automation
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="impact-card"
              >
                <div className="impact-number">80%</div>
                <h4>Prediction Accuracy</h4>
                <p>
                  Achieved with Machine Learning models for El Niño affected district 
                  prediction
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="impact-card"
              >
                <div className="impact-number">950+</div>
                <h4>Beneficiaries</h4>
                <p>
                  Registered and supported through cash transfer programs in 
                  extreme poverty communities
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="impact-card"
              >
                <div className="impact-number">100+</div>
                <h4>Professionals Trained</h4>
                <p>
                  Trained field technicians and enumerators in data collection 
                  using KoboCollect
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About