// src/pages/Publications.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calendar, 
  Users, 
  ExternalLink, 
  Download,
  BookOpen,
  File,
  Award,
  Sparkles,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/RemainingPages.css'

const Publications = () => {
  const [publicationsData, setPublicationsData] = useState([])
  const [loading, setLoading] = useState(true)

  // SEUS DADOS ORIGINAIS
  const defaultPublications = [
    {
      id: 1,
      type: 'Scientific Article',
      title: 'Morpho-physiological characterization of three Colletotrichum spp. isolates subjected to different broth culture and temperatures',
      authors: 'Tomane, T.M., et al.',
      journal: 'TIJER - INTERNATIONAL RESEARCH JOURNAL',
      year: '2024',
      description: 'Study on the morphological and physiological characteristics of Colletotrichum isolates under different conditions. Published in Volume 11 Issue 11, November-2024.',
      link: 'https://tijer.org/tijer/viewpaperforall.php?paper=TIJER2411135',
      paperLink: 'https://tijer.org/TIJER/papers/TIJER2411135.pdf',
      certificateLink: 'https://tijer.org/tijer/certificatemanager.php?a_rid=155662',
      icon: <FileText size={24} />
    },
    {
      id: 2,
      type: 'Scientific Article',
      title: 'Cross-pathogenicity of three (3) isolates of Colletotrichum spp. in two (2) tropical fruits',
      authors: 'Tomane, T.M., et al.',
      journal: 'TIJER - INTERNATIONAL RESEARCH JOURNAL',
      year: '2024',
      description: 'Research on the cross-pathogenicity of Colletotrichum species in tropical fruits. Published in Volume 11 Issue 11, November-2024.',
      link: 'https://tijer.org/tijer/viewpaperforall.php?paper=TIJER2411132',
      paperLink: 'https://tijer.org/TIJER/papers/TIJER2411132.pdf',
      certificateLink: null,
      icon: <FileText size={24} />
    },
    {
      id: 3,
      type: 'Success Story',
      title: 'The dedication of a young mother for the health and well-being of her community',
      authors: 'Tomane, T.M.',
      journal: 'UNICEF Mozambique',
      year: '2025',
      description: '"Espero servir bem a minha comunidade. É para o bem-estar de todos. Quero ajudar na prevenção das doenças e no saneamento do meio."',
      link: 'https://www.unicef.org/mozambique/historias/quando-maternidade-n%C3%A3o-%C3%A9-um-obst%C3%A1culo-o-percurso-de-uma-nova-agente-de-sa%C3%BAde',
      paperLink: null,
      certificateLink: null,
      icon: <BookOpen size={24} />
    },
    {
      id: 4,
      type: 'Success Story',
      title: 'A determined mother to ensure a healthy future for her children',
      authors: 'Tomane, T.M.',
      journal: 'UNICEF Mozambique',
      year: '2025',
      description: 'Uma mãe determinada a garantir um futuro saudável para os seus filhos. Success story highlighting maternal determination and child health.',
      link: 'https://www.unicef.org/mozambique/historias/uma-m%C3%A3e-determinada-garantir-um-futuro-saud%C3%A1vel-para-os-seus-filhos',
      paperLink: null,
      certificateLink: null,
      icon: <BookOpen size={24} />
    },
    {
      id: 5,
      type: 'Success Story',
      title: 'Between drought and hope: Eva\'s fight for the survival of little Zelinha',
      authors: 'Tomane, T.M.',
      journal: 'UNICEF Mozambique',
      year: '2025',
      description: 'A story of resilience and hope in the face of drought. Entre a seca e a esperança: A luta de Eva pela sobrevivência da pequena Zelinha.',
      link: 'https://www.unicef.org/mozambique/historias/entre-seca-e-esperan%C3%A7a-luta-de-eva-pela-sobreviv%C3%AAncia-da-pequena-zelinha',
      paperLink: null,
      certificateLink: null,
      icon: <BookOpen size={24} />
    },
    {
      id: 6,
      type: 'Success Story',
      title: 'A mother\'s strength in times of drought',
      authors: 'Tomane, T.M.',
      journal: 'UNICEF Mozambique',
      year: '2025',
      description: 'Força de uma mãe em tempos de seca. Community resilience and strength during drought conditions.',
      link: 'https://www.unicef.org/mozambique/historias/for%C3%A7a-de-uma-m%C3%A3e-em-tempos-de-seca',
      paperLink: null,
      certificateLink: null,
      icon: <BookOpen size={24} />
    }
  ]

  // Carregar dados do localStorage ou usar os padrão
  const loadPublications = () => {
    try {
      const saved = localStorage.getItem('portfolio_content_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.publications && parsed.publications.length > 0) {
          setPublicationsData(parsed.publications)
        } else {
          setPublicationsData(defaultPublications)
        }
      } else {
        setPublicationsData(defaultPublications)
      }
    } catch (e) {
      setPublicationsData(defaultPublications)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadPublications()

    const handleStorageChange = () => { loadPublications() }
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'content' || e.detail?.type === 'publications') loadPublications()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleContentUpdate)
    }
  }, [])

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

  const getTypeColor = (type) => {
    switch(type) {
      case 'Scientific Article':
        return '#2c3e50'
      case 'Success Story':
        return '#8b7355'
      default:
        return '#6c5b7b'
    }
  }

  const getTypeBg = (type) => {
    switch(type) {
      case 'Scientific Article':
        return 'rgba(44, 62, 80, 0.08)'
      case 'Success Story':
        return 'rgba(139, 115, 85, 0.08)'
      default:
        return 'rgba(108, 91, 123, 0.08)'
    }
  }

  if (loading) {
    return (
      <div className="publications-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  // Usar publicationsData do estado ou fallback para default
  const displayData = publicationsData.length > 0 ? publicationsData : defaultPublications

  return (
    <div className="publications-page">
      <SEO
        title="Publications"
        description="Scientific articles, research papers, and UNICEF success stories documenting research and impact in agriculture, health, and development."
      />
      <section className="publications-hero">
        <div className="publications-hero-background"></div>
        <div className="publications-hero-particles"></div>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="publications-hero-content"
          >
            <span className="publications-hero-badge">
              <Sparkles size={16} />
              Publications
            </span>
            <h1 className="publications-hero-title">Research & Publications</h1>
            <p className="publications-hero-subtitle">
              Scientific articles, research papers, and success stories documenting 
              my work and impact in development and research
            </p>
          </motion.div>
        </div>
      </section>

      <section className="publications-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="publications-list"
          >
            {displayData.map((pub, index) => (
              <motion.div
                key={pub.id}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="publication-item-enhanced"
              >
                <div className="publication-item-left">
                  <div 
                    className="publication-icon-enhanced"
                    style={{ 
                      background: getTypeBg(pub.type),
                      color: getTypeColor(pub.type)
                    }}
                  >
                    {pub.icon || <FileText size={24} />}
                  </div>
                </div>
                
                <div className="publication-item-content">
                  <div className="publication-header">
                    <span 
                      className="publication-type-enhanced"
                      style={{ 
                        background: getTypeBg(pub.type),
                        color: getTypeColor(pub.type)
                      }}
                    >
                      {pub.type}
                    </span>
                    <div className="publication-meta-enhanced">
                      <span className="publication-journal-enhanced">
                        <File size={14} />
                        {pub.journal}
                      </span>
                      <span className="publication-year-enhanced">
                        <Calendar size={14} />
                        {pub.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="publication-title-enhanced">{pub.title}</h3>
                  
                  <p className="publication-authors-enhanced">
                    <Users size={16} />
                    {pub.authors}
                  </p>

                  <p className="publication-description-enhanced">{pub.description}</p>

                  <div className="publication-actions-enhanced">
                    {pub.link && (
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="pub-action-enhanced primary"
                      >
                        <ExternalLink size={16} />
                        View Article
                      </a>
                    )}
                    {pub.paperLink && (
                      <a 
                        href={pub.paperLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="pub-action-enhanced secondary"
                      >
                        <Download size={16} />
                        Download PDF
                      </a>
                    )}
                    {pub.certificateLink && (
                      <a 
                        href={pub.certificateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="pub-action-enhanced certificate"
                      >
                        <Award size={16} />
                        Certificate
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="publications-cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="publications-cta-content"
          >
            <h2>Interested in My Research?</h2>
            <p>Reach out to discuss collaboration on research or publications</p>
            <a href="mailto:padacius@gmail.com" className="btn-primary">
              <ExternalLink size={20} />
              Get in Touch
              <ChevronRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Publications