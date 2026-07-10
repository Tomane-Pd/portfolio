// src/pages/Skills.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  BarChart3, 
  LineChart,
  GitBranch,
  Brain,
  Globe,
  PieChart,
  Layers,
  Cpu,
  Shield,
  TrendingUp,
  Users,
  FileCode,
  Server,
  Cloud,
  Activity,
  RefreshCw
} from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/Skills.css'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [skillsData, setSkillsData] = useState([])
  const [loading, setLoading] = useState(true)

  // Dados das habilidades (SEUS DADOS ORIGINAIS)
  const defaultSkills = [
    {
      id: 1,
      name: 'Python',
      category: 'programming',
      icon: <Code size={24} />,
      level: 90,
      description: 'Advanced Python for data science, automation, and machine learning',
      color: '#3776AB',
      projects: 12
    },
    {
      id: 2,
      name: 'R',
      category: 'programming',
      icon: <FileCode size={24} />,
      level: 85,
      description: 'Statistical analysis, data visualization, and reporting',
      color: '#276DC3',
      projects: 10
    },
    {
      id: 3,
      name: 'SQL',
      category: 'programming',
      icon: <Database size={24} />,
      level: 80,
      description: 'Database querying, optimization, and data extraction',
      color: '#4479A1',
      projects: 8
    },
    {
      id: 4,
      name: 'Power BI',
      category: 'data',
      icon: <BarChart3 size={24} />,
      level: 85,
      description: 'Interactive dashboards and business intelligence reporting',
      color: '#F2C811',
      projects: 15
    },
    {
      id: 5,
      name: 'Tableau',
      category: 'data',
      icon: <PieChart size={24} />,
      level: 80,
      description: 'Data visualization and dashboard creation',
      color: '#E97627',
      projects: 8
    },
    {
      id: 6,
      name: 'Excel Advanced',
      category: 'data',
      icon: <LineChart size={24} />,
      level: 90,
      description: 'Advanced formulas, VBA, pivot tables, and data analysis',
      color: '#217346',
      projects: 20
    },
    {
      id: 7,
      name: 'Data Visualization',
      category: 'visualization',
      icon: <BarChart3 size={24} />,
      level: 88,
      description: 'Creating compelling visual stories from complex data',
      color: '#6C5B7B',
      projects: 18
    },
    {
      id: 8,
      name: 'Looker Studio',
      category: 'visualization',
      icon: <LineChart size={24} />,
      level: 75,
      description: 'Google Looker Studio for interactive dashboards',
      color: '#4285F4',
      projects: 6
    },
    {
      id: 9,
      name: 'Machine Learning',
      category: 'ml',
      icon: <Brain size={24} />,
      level: 85,
      description: 'Supervised and unsupervised learning, model evaluation',
      color: '#FF6B6B',
      projects: 8
    },
    {
      id: 10,
      name: 'Deep Learning',
      category: 'ml',
      icon: <Cpu size={24} />,
      level: 75,
      description: 'Neural networks, deep learning architectures',
      color: '#4ECDC4',
      projects: 5
    },
    {
      id: 11,
      name: 'Statistics',
      category: 'ml',
      icon: <TrendingUp size={24} />,
      level: 85,
      description: 'Statistical analysis, hypothesis testing, experimental design',
      color: '#45B7D1',
      projects: 15
    },
    {
      id: 12,
      name: 'ArcGIS',
      category: 'gis',
      icon: <Globe size={24} />,
      level: 80,
      description: 'Geospatial analysis and mapping with ArcGIS',
      color: '#2C3E50',
      projects: 10
    },
    {
      id: 13,
      name: 'QGIS',
      category: 'gis',
      icon: <Globe size={24} />,
      level: 75,
      description: 'Open-source GIS for spatial analysis and mapping',
      color: '#589632',
      projects: 8
    },
    {
      id: 14,
      name: 'MEAL',
      category: 'meal',
      icon: <Activity size={24} />,
      level: 90,
      description: 'Monitoring, Evaluation, Accountability & Learning',
      color: '#8B7355',
      projects: 15
    },
    {
      id: 15,
      name: 'Project Management',
      category: 'meal',
      icon: <Users size={24} />,
      level: 85,
      description: 'Project planning, execution, monitoring, and reporting',
      color: '#3498DB',
      projects: 12
    },
    {
      id: 16,
      name: 'Research Methods',
      category: 'meal',
      icon: <Shield size={24} />,
      level: 88,
      description: 'Quantitative and qualitative research methodologies',
      color: '#9B59B6',
      projects: 14
    }
  ]

  // Carregar dados do localStorage ou usar os padrão
  const loadSkills = () => {
    try {
      const saved = localStorage.getItem('portfolio_content_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.skills && parsed.skills.length > 0) {
          setSkillsData(parsed.skills)
        } else {
          setSkillsData(defaultSkills)
        }
      } else {
        setSkillsData(defaultSkills)
      }
    } catch (e) {
      setSkillsData(defaultSkills)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadSkills()

    const handleStorageChange = () => { loadSkills() }
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'content' || e.detail?.type === 'skills') loadSkills()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleContentUpdate)
    }
  }, [])

  const skillCategories = [
    { id: 'all', label: 'All Skills', icon: <Layers size={18} /> },
    { id: 'programming', label: 'Programming', icon: <Code size={18} /> },
    { id: 'data', label: 'Data & Analytics', icon: <Database size={18} /> },
    { id: 'visualization', label: 'Visualization', icon: <BarChart3 size={18} /> },
    { id: 'ml', label: 'ML & AI', icon: <Brain size={18} /> },
    { id: 'gis', label: 'GIS & Mapping', icon: <Globe size={18} /> },
    { id: 'meal', label: 'MEAL & Research', icon: <Activity size={18} /> }
  ]

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory)

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
        staggerChildren: 0.08
      }
    }
  }

  if (loading) {
    return (
      <div className="skills-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  // Usar skillsData do estado ou fallback para default
  const displayData = skillsData.length > 0 ? skillsData : defaultSkills

  return (
    <div className="skills-page">
      <SEO
        title="Skills"
        description="Technical toolkit spanning Python, R, SQL, Power BI, Machine Learning, GIS, and MEAL & research methods."
      />
      {/* Hero Section */}
      <section className="skills-hero">
        <div className="skills-hero-background"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="skills-hero-content"
          >
            <span className="skills-hero-badge">Expertise</span>
            <h1 className="skills-hero-title">Technical Skills</h1>
            <p className="skills-hero-subtitle">
              A comprehensive toolkit of data science, analytics, and development skills
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          {/* Category Filter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="skills-filter"
          >
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="skills-grid"
          >
            {displayData.map((skill, index) => {
              // Pegar a cor do skill ou usar padrão
              const skillColor = skill.color || '#8b7355'
              return (
                <motion.div
                  key={skill.id}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="skill-card"
                >
                  <div className="skill-header">
                    <div className="skill-icon" style={{ color: skillColor }}>
                      {skill.icon || <Code size={24} />}
                    </div>
                    <div className="skill-info">
                      <h3 className="skill-name">{skill.name}</h3>
                      <span className="skill-projects">{skill.projects || Math.round(skill.level / 10)} projects</span>
                    </div>
                  </div>
                  <div className="skill-bar-container">
                    <div className="skill-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="skill-progress"
                        style={{ 
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skillColor}, ${skillColor}dd)`
                        }}
                      >
                        <span className="skill-percentage">{skill.level}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <p className="skill-description">{skill.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Radar Section */}
      <section className="skills-radar-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">Overview</span>
            <h2 className="section-title">Skills Distribution</h2>
            <p className="section-subtitle">
              Proficiency across different domains and technologies
            </p>
          </motion.div>

          <div className="radar-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="radar-card"
            >
              <div className="radar-icon">
                <Code size={28} />
              </div>
              <div className="radar-content">
                <h3>Programming</h3>
                <div className="radar-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="radar-progress programming"
                  ></motion.div>
                </div>
                <span className="radar-level">Advanced</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="radar-card"
            >
              <div className="radar-icon">
                <Database size={28} />
              </div>
              <div className="radar-content">
                <h3>Data & Analytics</h3>
                <div className="radar-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="radar-progress data"
                  ></motion.div>
                </div>
                <span className="radar-level">Advanced</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="radar-card"
            >
              <div className="radar-icon">
                <Brain size={28} />
              </div>
              <div className="radar-content">
                <h3>ML & AI</h3>
                <div className="radar-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="radar-progress ml"
                  ></motion.div>
                </div>
                <span className="radar-level">Proficient</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="radar-card"
            >
              <div className="radar-icon">
                <Globe size={28} />
              </div>
              <div className="radar-content">
                <h3>GIS & Mapping</h3>
                <div className="radar-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="radar-progress gis"
                  ></motion.div>
                </div>
                <span className="radar-level">Proficient</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="radar-card"
            >
              <div className="radar-icon">
                <Activity size={28} />
              </div>
              <div className="radar-content">
                <h3>MEAL & Research</h3>
                <div className="radar-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="radar-progress meal"
                  ></motion.div>
                </div>
                <span className="radar-level">Expert</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="radar-card"
            >
              <div className="radar-icon">
                <Users size={28} />
              </div>
              <div className="radar-content">
                <h3>Project Management</h3>
                <div className="radar-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="radar-progress management"
                  ></motion.div>
                </div>
                <span className="radar-level">Advanced</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="languages-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-badge">Languages</span>
            <h2 className="section-title">Language Proficiency</h2>
            <p className="section-subtitle">
              Multilingual capabilities for global collaboration
            </p>
          </motion.div>

          <div className="languages-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="language-card"
            >
              <div className="language-flag">🇵🇹</div>
              <div className="language-info">
                <h4>Portuguese</h4>
                <p>Native / Fluent</p>
                <div className="language-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="language-progress portuguese"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="language-card"
            >
              <div className="language-flag">🇬🇧</div>
              <div className="language-info">
                <h4>English</h4>
                <p>Intermediate</p>
                <div className="language-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="language-progress english"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="language-card"
            >
              <div className="language-flag">🇲🇿</div>
              <div className="language-info">
                <h4>Shona</h4>
                <p>Native</p>
                <div className="language-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="language-progress shona"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="language-card"
            >
              <div className="language-flag">🇲🇿</div>
              <div className="language-info">
                <h4>Sena</h4>
                <p>Intermediate</p>
                <div className="language-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="language-progress sena"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills