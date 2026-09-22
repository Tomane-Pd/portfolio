// src/pages/Projects.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  ChevronRight,
  Calendar,
  Github,
  ExternalLink,
  Grid,
  List,
  Layers,
  X,
  RefreshCw,
  Code2
} from 'lucide-react'
import { loadProjects as loadStoredProjects } from '../utils/projectsStore'
import SEO from '../components/SEO'
import '../styles/Projects.css'

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Projetos padrão (src/data/projectsData.js) + alterações feitas no Admin
  const loadProjects = () => {
    setProjects(loadStoredProjects())
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()

    const handleStorageChange = () => { loadProjects() }
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'projects') loadProjects()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleContentUpdate)
    }
  }, [])

  // Categorias: ordem preferida + qualquer categoria nova criada no Admin, com contagem
  const categoryOrder = ['Machine Learning', 'Data Science', 'Data Engineering', 'Automation', 'Platform', 'Research']
  const countFor = (cat) => projects.filter(p => p.category === cat).length
  const extraCategories = [...new Set(projects.map(p => p.category).filter(Boolean))]
    .filter(cat => !categoryOrder.includes(cat))
  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    ...[...categoryOrder, ...extraCategories]
      .filter(cat => countFor(cat) > 0)
      .map(cat => ({ id: cat, label: cat, count: countFor(cat) }))
  ]
  const hasCode = (project) => (project.notebooks && project.notebooks.length > 0) || !!project.code

  // Filtrar projetos
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
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

  if (loading) {
    return (
      <div className="projects-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando projetos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="projects-page">
      <SEO
        title="Projects"
        description="Data science, machine learning, automation and MEAL projects by Tomane Mateus Tomane, with the full Python code: LSTM stock price prediction, Olympic medals prediction, geospatial analysis and more."
      />
      <section className="projects-hero">
        <div className="projects-hero-background"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="projects-hero-content"
          >
            <span className="projects-hero-badge">Portfolio</span>
            <h1 className="projects-hero-title">My Projects</h1>
            <p className="projects-hero-subtitle">
              A showcase of data science, AI, and MEAL projects that drive impact
            </p>
          </motion.div>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="projects-controls"
          >
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="controls-right">
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                    <span className="category-count">{category.count}</span>
                  </button>
                ))}
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="projects-count">
            <span>{filteredProjects.length} projects found</span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className={`projects-grid ${viewMode === 'list' ? 'list-view' : ''}`}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="project-card"
              >
                <Link to={`/projects/${project.id}`} className="project-link">
                  <div className="project-image-container">
                    <img
                      src={project.image || '/images/projects/placeholder.svg'}
                      alt={project.title}
                      className="project-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/images/projects/placeholder.svg'
                      }}
                    />
                    {hasCode(project) && (
                      <div className="project-code-badge">
                        <Code2 size={14} />
                        Code
                      </div>
                    )}
                    <div className="project-status">
                      <span className={`status-badge ${project.status?.toLowerCase() || 'active'}`}>
                        {project.status || 'Active'}
                      </span>
                    </div>
                    <div className="project-overlay">
                      <span className="view-details">
                        View Details
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="project-content">
                  <div className="project-category">
                    {project.category || 'Uncategorized'}
                  </div>
                  <h3 className="project-title">
                    <Link to={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies?.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="project-tech">{tech}</span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="project-tech-more">+{project.technologies.length - 4}</span>
                    )}
                  </div>

                  <div className="project-footer">
                    <div className="project-date">
                      <Calendar size={14} />
                      <span>{project.date || '2024'}</span>
                    </div>
                    <div className="project-links">
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-icon live"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="no-projects"
            >
              <Layers size={48} />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="projects-cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="projects-cta-content"
          >
            <h2>Have a Project in Mind?</h2>
            <p>
              Let's collaborate on data science, MEAL, or AI initiatives
            </p>
            <Link to="/contact" className="btn-primary">
              Let's Work Together
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects