// src/pages/Education.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  BookOpen,
  ChevronRight,
  ExternalLink,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  CheckCircle,
  RefreshCw
} from 'lucide-react'
import { additionalCertifications } from '../data/certificationsData'
import SEO from '../components/SEO'
import '../styles/Education.css'

const Education = () => {
  const [showCertifications, setShowCertifications] = useState(false)
  const [educationData, setEducationData] = useState([])
  const [loading, setLoading] = useState(true)

  // Dados da formação acadêmica (SEUS DADOS ORIGINAIS)
  const defaultEducationData = [
    {
      id: 1,
      type: 'MBA',
      title: 'MBA in Data Science & Analytics',
      institution: 'University of São Paulo (USP-ESALQ)',
      location: 'Brazil',
      period: '2024 - 2026',
      description: 'Advanced program focusing on data science, machine learning, analytics, and their applications in business and development contexts.',
      skills: ['Data Science', 'Data Wrangling', 'Statistics', 'Machine Learning', 'Deep Learning', 'Business Analytics', 'Predictive Modeling', 'Big Data'],
      icon: <GraduationCap size={28} />,
      color: '#8b7355',
      certificate: null
    },
    {
      id: 2,
      type: 'Postgraduate',
      title: 'Advanced Postgraduate Diploma in Public Health Research',
      institution: 'James Lind Institute',
      location: 'Switzerland',
      period: '2024 - 2025',
      description: 'Specialized training in public health research methodologies, epidemiology, and evidence-based practice for health interventions.',
      skills: ['Public Health', 'Epidemiology', 'Nutrition', 'Biostatistics', 'Research Methods', 'Health Data Analysis', 'Evidence-Based Practice'],
      icon: <BookOpen size={28} />,
      color: '#2c3e50',
      certificate: '/documents/certifications/public-health-research.pdf'
    },
    {
      id: 3,
      type: 'Postgraduate',
      title: 'Postgraduate Diploma in MEAL',
      institution: 'World Academy for Research and Development',
      location: 'United Kingdom',
      period: '2023 - 2024',
      description: 'Comprehensive training in Monitoring, Evaluation, Accountability, and Learning for international development and humanitarian contexts.',
      skills: ['Monitoring & Evaluation', 'Accountability', 'Learning', 'Project Management', 'Impact Assessment'],
      icon: <Award size={28} />,
      color: '#8b7355',
      certificate: '/documents/certifications/meal-diploma.pdf'
    },
    {
      id: 4,
      type: 'Bachelor',
      title: 'Bachelor of Science in Agricultural Engineering',
      institution: 'Universidade do Zambeze / Faculty of Agricultural and Forestry Engineering',
      location: 'Mozambique',
      period: '2017 - 2021',
      description: 'Comprehensive training in agricultural sciences, engineering principles, and sustainable development practices.',
      skills: ['Agricultural Science', 'Sustainable Development', 'GIS', 'Research', 'Rural Development'],
      icon: <GraduationCap size={28} />,
      color: '#2c3e50',
      certificate: '/documents/certifications/agricultural-engineering.jpg'
    }
  ]

  // Carregar dados do localStorage ou usar os padrão
  const loadEducation = () => {
    try {
      const saved = localStorage.getItem('portfolio_content_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.education && parsed.education.length > 0) {
          setEducationData(parsed.education)
        } else {
          setEducationData(defaultEducationData)
        }
      } else {
        setEducationData(defaultEducationData)
      }
    } catch (e) {
      setEducationData(defaultEducationData)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadEducation()

    const handleStorageChange = () => { loadEducation() }
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'content' || e.detail?.type === 'education') loadEducation()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleContentUpdate)
    }
  }, [])

  // Certificados adicionais (importados de src/data/certificationsData.js)

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
        staggerChildren: 0.15
      }
    }
  }

  const openCertificate = (file) => {
    if (file) {
      window.open(file, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="education-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  // Usar educationData do estado ou fallback para default
  const displayData = educationData.length > 0 ? educationData : defaultEducationData

  return (
    <div className="education-page">
      <SEO
        title="Education"
        description="Academic journey combining agricultural engineering, an MBA in Data Science & Analytics, and 40+ professional certifications."
      />
      {/* Hero Section */}
      <section className="education-hero">
        <div className="education-hero-background"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="education-hero-content"
          >
            <span className="education-hero-badge">Education</span>
            <h1 className="education-hero-title">Academic Journey</h1>
            <p className="education-hero-subtitle">
              A strong academic foundation combining engineering, data science, 
              and development studies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
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
            <h2 className="section-title">Education Timeline</h2>
            <p className="section-subtitle">
              My academic journey from bachelor's to specialized postgraduate studies
            </p>
          </motion.div>

          <div className="timeline">
            {displayData.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="timeline-header">
                      <div className="timeline-icon" style={{ background: item.color || '#8b7355' }}>
                        {item.icon || <GraduationCap size={28} />}
                      </div>
                      <div className="timeline-meta">
                        <span className="timeline-type">{item.type}</span>
                        <span className="timeline-period">
                          <Calendar size={16} />
                          {item.period}
                        </span>
                      </div>
                    </div>

                    <h3 className="timeline-title">{item.title}</h3>
                    
                    <div className="timeline-institution">
                      <span className="institution-name">{item.institution}</span>
                      <span className="institution-location">
                        <MapPin size={14} />
                        {item.location}
                      </span>
                    </div>

                    <p className="timeline-description">{item.description}</p>

                    <div className="timeline-skills">
                      <h4>Key Skills Acquired</h4>
                      <div className="skills-tags">
                        {item.skills && item.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {item.certificate && (
                      <div className="timeline-certificate-actions">
                        <button 
                          className="cert-btn view"
                          onClick={() => openCertificate(item.certificate)}
                        >
                          <Eye size={16} />
                          View Certificate
                        </button>
                        <a 
                          href={item.certificate}
                          download
                          className="cert-btn download"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Certifications Section */}
      <section className="certifications-section-merged">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">Certifications</span>
            <h2 className="section-title">Professional Certifications</h2>
            <p className="section-subtitle">
              Additional certifications from LinkedIn Learning and United Nations
            </p>
          </motion.div>

          <div className="certifications-toggle-wrapper">
            <div 
              className="certifications-toggle"
              onClick={() => setShowCertifications(!showCertifications)}
            >
              <div className="toggle-left">
                <FileText size={22} />
                <span>Show All Certifications ({additionalCertifications.length})</span>
              </div>
              {showCertifications ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
            </div>

            {showCertifications && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
                className="certifications-list-merged"
              >
                {additionalCertifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.01 }}
                    className="cert-item-merged"
                  >
                    <span className="cert-item-title">{cert.title}</span>
                    <div className="cert-item-actions">
                      <button 
                        className="cert-item-btn view"
                        onClick={() => openCertificate(cert.file)}
                        title="View Certificate"
                      >
                        <Eye size={16} />
                      </button>
                      <a 
                        href={cert.file}
                        download
                        className="cert-item-btn download"
                        title="Download Certificate"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="certifications-linkedin-cta"
          >
            <a 
              href="https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-cert-btn"
            >
              <ExternalLink size={18} />
              View All Certifications on LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* Education Stats */}
      <section className="education-stats-section">
        <div className="container">
          <div className="education-stats-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="edu-stat-card"
            >
              <div className="edu-stat-number">{displayData.length}</div>
              <div className="edu-stat-label">Academic Degrees</div>
              <p>Bachelor + Postgraduate</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="edu-stat-card"
            >
              <div className="edu-stat-number">40+</div>
              <div className="edu-stat-label">Certifications</div>
              <p>International Recognized</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="edu-stat-card"
            >
              <div className="edu-stat-number">4</div>
              <div className="edu-stat-label">Countries</div>
              <p>Study Locations</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="edu-stat-card"
            >
              <div className="edu-stat-number">20+</div>
              <div className="edu-stat-label">Courses Completed</div>
              <p>Specialized Training</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="edu-cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="edu-cta-content"
          >
            <h2>View My Full Credentials</h2>
            <p>
              Explore my complete academic and professional certifications on LinkedIn
            </p>
            <a 
              href="https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={20} />
              View on LinkedIn
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Education