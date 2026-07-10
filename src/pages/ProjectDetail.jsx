// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Github,
  ExternalLink,
  Code,
  FileText,
  Image,
  Video,
  FileCode,
  FileSpreadsheet,
  FolderOpen,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  Folder,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react'
import { projectsData } from '../data/projectsData'
import SEO from '../components/SEO'
import '../styles/ProjectDetail.css'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Procura primeiro nos projetos salvos (Admin), depois nos projetos padrão
  const loadProject = () => {
    try {
      const saved = localStorage.getItem('portfolio_projects')
      const parsed = saved ? JSON.parse(saved) : null
      const pool = parsed && parsed.length > 0 ? parsed : projectsData
      const found = pool.find(p => p.id === id) || projectsData.find(p => p.id === id)
      setProject(found || null)
    } catch (e) {
      setProject(projectsData.find(p => p.id === id) || null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProject()

    // Escutar mudanças
    const handleStorageChange = () => {
      loadProject()
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleStorageChange)
    }
  }, [id])

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando projeto...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn-primary">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={18} /> },
    { id: 'details', label: 'Details', icon: <FolderOpen size={18} /> },
    { id: 'materials', label: 'Materials', icon: <Folder size={18} /> }
  ]

  const iconMap = {
    Code: <Code size={20} />,
    FileCode: <FileCode size={20} />,
    FileText: <FileText size={20} />,
    FileSpreadsheet: <FileSpreadsheet size={20} />,
    Image: <Image size={20} />,
    Video: <Video size={20} />,
    ExternalLink: <ExternalLink size={20} />
  }

  return (
    <div className="project-detail-page">
      <SEO title={project.title} description={project.description} />
      <div className="project-detail-back">
        <div className="container">
          <button onClick={() => navigate('/projects')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Projects
          </button>
        </div>
      </div>

      <section className="project-detail-hero">
        <div className="project-detail-hero-background"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="project-detail-hero-content"
          >
            <div className="project-detail-hero-left">
              <span className="project-detail-category">{project.category}</span>
              <h1 className="project-detail-title">{project.title}</h1>
              <p className="project-detail-description">{project.description}</p>
              <div className="project-detail-meta">
                <span className="project-detail-status">
                  <span className={`status-dot ${project.status?.toLowerCase() || 'active'}`}></span>
                  {project.status || 'Active'}
                </span>
                <span className="project-detail-date">
                  <Calendar size={16} />
                  {project.date || '2024'}
                </span>
              </div>
              <div className="project-detail-actions">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <Github size={20} />
                    View Project
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            <div className="project-detail-hero-right">
              <div className="project-detail-image-container">
                <img src={project.image || '/images/projects/placeholder.svg'} alt={project.title} className="project-detail-image" onError={(e) => { e.target.onerror = null; e.target.src = '/images/projects/placeholder.svg' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="project-detail-content">
        <div className="container">
          <div className="project-detail-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="project-detail-body">
            {activeTab === 'overview' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="tab-content"
              >
                <div className="overview-grid">
                  <div className="overview-section">
                    <h3><Target size={22} /> Problem Solved</h3>
                    <p>{project.problem || 'No problem description provided.'}</p>
                  </div>
                  <div className="overview-section">
                    <h3><CheckCircle size={22} /> Objectives</h3>
                    <ul>
                      {project.objectives?.map((obj, idx) => (
                        <li key={idx}><ChevronRight size={16} />{obj}</li>
                      )) || <li>No objectives defined.</li>}
                    </ul>
                  </div>
                  <div className="overview-section">
                    <h3><TrendingUp size={22} /> Results</h3>
                    <ul className="results-list">
                      {project.results?.map((result, idx) => (
                        <li key={idx}><CheckCircle size={16} />{result}</li>
                      )) || <li>No results defined.</li>}
                    </ul>
                  </div>
                  <div className="overview-section">
                    <h3><Lightbulb size={22} /> Lessons Learned</h3>
                    <p>{project.lessons || 'No lessons documented.'}</p>
                  </div>
                </div>

                <div className="overview-technologies">
                  <h3><Code size={22} /> Technologies Used</h3>
                  <div className="tech-tags">
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    )) || <span className="tech-tag">No technologies listed</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="tab-content"
              >
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Methodology</span>
                    <p>{project.methodology || 'No methodology described.'}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className={`detail-status ${project.status?.toLowerCase() || 'active'}`}>
                      {project.status || 'Active'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date</span>
                    <span>{project.date || '2024'}</span>
                  </div>
                  {project.github && (
                    <div className="detail-item">
                      <span className="detail-label">Repository</span>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.github.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  {project.live && (
                    <div className="detail-item">
                      <span className="detail-label">Live Demo</span>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        {project.live.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'materials' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="tab-content"
              >
                <div className="materials-grid">
                  {project.materials?.map((material, idx) => (
                    <a 
                      key={idx} 
                      href={material.url || '#'} 
                      className="material-card"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="material-icon">{iconMap[material.icon] || <FileText size={20} />}</div>
                      <div className="material-info">
                        <span className="material-label">{material.label}</span>
                        <span className="material-type">{material.type}</span>
                      </div>
                      <Download size={18} className="material-download" />
                    </a>
                  )) || <p className="no-materials">No materials available for this project.</p>}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="related-projects-cta">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="related-content"
          >
            <h2>Explore More Projects</h2>
            <p>Check out other projects in my portfolio</p>
            <Link to="/projects" className="btn-primary">
              View All Projects
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail