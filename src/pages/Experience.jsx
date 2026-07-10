// src/pages/Experience.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building2,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  TrendingUp,
  Code,
  Database,
  BarChart3,
  GitBranch,
  Layers,
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  RefreshCw
} from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/Experience.css'

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [experienceData, setExperienceData] = useState([])
  const [loading, setLoading] = useState(true)

  // Dados das experiências profissionais (SEUS DADOS ORIGINAIS)
  const defaultExperiences = [
    {
      id: 1,
      organization: 'UNICEF Mozambique',
      role: 'Data & Information Officer',
      period: 'Apr 2024 - Present',
      location: 'Mozambique',
      type: 'Current',
      description: 'Leading data integration, analytics, and information management for health and nutrition programs in emergency contexts.',
      responsibilities: [
        'Developed Python-based data integration solutions reducing aggregation time from weeks to seconds with 95% efficiency',
        'Applied Machine Learning models (Boosting, Deep Learning) for El Niño affected district prediction with 80% accuracy',
        'Implemented Random Forest models for cholera outbreak prediction with 76% accuracy',
        'Trained 100+ technicians and enumerators in data collection using KoboCollect in Sofala and Zambézia',
        'Supported program planning with implementing partners and reporting for Health & Nutrition cluster'
      ],
      achievements: [
        '95% efficiency gain in data aggregation',
        '80% accuracy in El Niño prediction models',
        'Trained over 100 professionals',
        'Pre-positioning of supplies in Sofala (2025)'
      ],
      technologies: ['Python', 'Machine Learning', 'KoboCollect', 'Excel', 'Power BI', 'SQL'],
      icon: <Building2 size={28} />,
      color: '#1a73e8',
      image: '/images/experience/unicef.jpg'
    },
    {
      id: 2,
      organization: 'GiveDirectly',
      role: 'Field Officer & Call Center Agent',
      period: 'Aug 2022 - Dec 2023',
      location: 'Mozambique',
      type: 'Past',
      description: 'Managed cash transfer programs for extreme poverty communities, ensuring successful delivery and beneficiary support.',
      responsibilities: [
        'Registered and monitored 950+ beneficiaries in extreme poverty communities in Nhamatanda',
        'Provided efficient call center support, resolving complex cases and ensuring quality beneficiary experience',
        'Led USAID and Google-funded research, integrating feedback for evidence-based program decisions',
        'Recognized as best employee for performance, dedication, and beneficiary advocacy'
      ],
      achievements: [
        '950+ beneficiaries successfully supported',
        'Recognized as best employee',
        'Led USAID and Google-funded research',
        'Advocated for beneficiary needs'
      ],
      technologies: ['Call Center Systems', 'Excel', 'Research Methods', 'Community Engagement', 'Data Collection'],
      icon: <Users size={28} />,
      color: '#e67e22',
      image: '/images/experience/givedirectly.jpg'
    },
    {
      id: 3,
      organization: 'FAO (Food and Agriculture Organization)',
      role: 'Qualitative Researcher',
      period: 'Jun 2022 - Jul 2022',
      location: 'Manica, Mozambique',
      type: 'Past',
      description: 'Conducted qualitative research to understand farmer experiences in post-cyclone agricultural support programs.',
      responsibilities: [
        'Conducted qualitative field research with 300+ farmers in Manica',
        'Generated insights for improving agricultural interventions',
        'Documented beneficiary experiences and program impacts'
      ],
      achievements: [
        'Reached 300+ farmers',
        'Generated actionable insights for program improvement',
        'Documented beneficiary experiences'
      ],
      technologies: ['Qualitative Research', 'Interview Techniques', 'Data Analysis', 'Report Writing'],
      icon: <BarChart3 size={28} />,
      color: '#2ecc71',
      image: '/images/experience/fao.jpg'
    },
    {
      id: 4,
      organization: 'ONU-WIDER / Mozambique Inclusive Growth',
      role: 'Research Assistant',
      period: 'Mar 2022 - May 2022',
      location: 'Mozambique',
      type: 'Past',
      description: 'Supported research on manufacturing industries across 5 provinces to understand industrial development trends.',
      responsibilities: [
        'Auxiliary research in manufacturing industries across 5 provinces',
        'Collected and analyzed data on industrial development trends',
        'Supported longitudinal research on industrial growth'
      ],
      achievements: [
        'Covered 5 provinces',
        'Contributed to industrial development research',
        'Data collection and analysis support'
      ],
      technologies: ['Data Collection', 'Research Methods', 'Excel', 'Data Analysis', 'Report Writing'],
      icon: <Database size={28} />,
      color: '#9b59b6',
      image: '/images/experience/wider.jpg'
    }
  ]

  // Carregar dados do localStorage ou usar os padrão
  const loadExperience = () => {
    try {
      const saved = localStorage.getItem('portfolio_content_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.experience && parsed.experience.length > 0) {
          setExperienceData(parsed.experience)
        } else {
          setExperienceData(defaultExperiences)
        }
      } else {
        setExperienceData(defaultExperiences)
      }
    } catch (e) {
      setExperienceData(defaultExperiences)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadExperience()

    const handleStorageChange = () => { loadExperience() }
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'content' || e.detail?.type === 'experience') loadExperience()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleContentUpdate)
    }
  }, [])

  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  if (loading) {
    return (
      <div className="experience-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  // Usar experienceData do estado ou fallback para default
  const displayData = experienceData.length > 0 ? experienceData : defaultExperiences

  return (
    <div className="experience-page">
      <SEO
        title="Experience"
        description="Over 5 years of professional experience in data science, MEAL, and research with UNICEF, GiveDirectly, FAO, and ONU-WIDER."
      />
      {/* Hero Section */}
      <section className="experience-hero">
        <div className="experience-hero-background"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="experience-hero-content"
          >
            <span className="experience-hero-badge">Experience</span>
            <h1 className="experience-hero-title">Professional Journey</h1>
            <p className="experience-hero-subtitle">
              Over 5 years of impactful work in data science, MEAL, and research 
              with UN agencies, NGOs, and development organizations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="experience-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">Timeline</span>
            <h2 className="section-title">Work Experience</h2>
            <p className="section-subtitle">
              A journey of impact across organizations and sectors
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="experience-list"
          >
            {displayData.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`experience-item ${expandedId === exp.id ? 'expanded' : ''}`}
              >
                <div className="experience-card" onClick={() => toggleExpand(exp.id)}>
                  <div className="experience-header">
                    <div className="experience-icon" style={{ background: exp.color || '#8b7355' }}>
                      {exp.icon || <Briefcase size={28} />}
                    </div>
                    <div className="experience-meta">
                      <div className="experience-org-role">
                        <h3 className="experience-org">{exp.organization}</h3>
                        <span className="experience-role">{exp.role}</span>
                      </div>
                      <div className="experience-details">
                        <span className="experience-period">
                          <Calendar size={16} />
                          {exp.period}
                        </span>
                        <span className="experience-location">
                          <MapPin size={16} />
                          {exp.location}
                        </span>
                        {exp.type === 'Current' && (
                          <span className="experience-badge-current">Current</span>
                        )}
                      </div>
                    </div>
                    <div className="experience-toggle">
                      {expandedId === exp.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>

                  <div className="experience-description">
                    <p>{exp.description}</p>
                  </div>

                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="experience-expanded"
                      >
                        <div className="expanded-content">
                          <div className="expanded-grid">
                            {/* Responsibilities */}
                            <div className="expanded-section">
                              <h4>
                                <Target size={20} />
                                Responsibilities
                              </h4>
                              <ul className="expanded-list">
                                {exp.responsibilities && exp.responsibilities.map((item, idx) => (
                                  <li key={idx}>
                                    <CheckCircle size={16} />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Achievements */}
                            <div className="expanded-section">
                              <h4>
                                <Award size={20} />
                                Key Achievements
                              </h4>
                              <ul className="expanded-list achievements-list">
                                {exp.achievements && exp.achievements.map((item, idx) => (
                                  <li key={idx}>
                                    <TrendingUp size={16} />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="expanded-technologies">
                            <h4>
                              <Code size={20} />
                              Technologies & Skills
                            </h4>
                            <div className="tech-tags">
                              {exp.technologies && exp.technologies.map((tech, idx) => (
                                <span key={idx} className="tech-tag">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Stats */}
      <section className="experience-stats-section">
        <div className="container">
          <div className="experience-stats-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="exp-stat-card"
            >
              <div className="exp-stat-icon">
                <Briefcase size={32} />
              </div>
              <div className="exp-stat-number">5+</div>
              <div className="exp-stat-label">Years of Experience</div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="exp-stat-card"
            >
              <div className="exp-stat-icon">
                <Building2 size={32} />
              </div>
              <div className="exp-stat-number">{displayData.length}</div>
              <div className="exp-stat-label">Organizations</div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="exp-stat-card"
            >
              <div className="exp-stat-icon">
                <Users size={32} />
              </div>
              <div className="exp-stat-number">100+</div>
              <div className="exp-stat-label">Professionals Trained</div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="exp-stat-card"
            >
              <div className="exp-stat-icon">
                <Target size={32} />
              </div>
              <div className="exp-stat-number">95%</div>
              <div className="exp-stat-label">Efficiency Gain</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="exp-cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="exp-cta-content"
          >
            <h2>Ready to Collaborate?</h2>
            <p>
              Let's discuss how I can contribute to your organization's data and 
              MEAL initiatives
            </p>
            <div className="exp-cta-actions">
              <a href="mailto:padacius@gmail.com" className="btn-primary">
                Contact Me
                <ExternalLink size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Experience