// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Briefcase,
  RefreshCw
} from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactData, setContactData] = useState({})
  const [loading, setLoading] = useState(true)

  const loadContact = () => {
    try {
      const saved = localStorage.getItem('portfolio_content_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        setContactData(parsed.contact || {})
      }
    } catch (e) {
      setContactData({})
    }
    setLoading(false)
  }

  useEffect(() => {
    loadContact()

    const handleStorageChange = () => { loadContact() }
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'content' || e.detail?.type === 'contact') loadContact()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contentUpdated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contentUpdated', handleContentUpdate)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const recipient = contactData.email || 'padacius@gmail.com'
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setFormStatus('success')
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setFormStatus(null), 5000)
    }, 600)
  }

  // Usar dados do Admin se disponíveis, senão usar fallback
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: contactData.email || 'padacius@gmail.com',
      link: `mailto:${contactData.email || 'padacius@gmail.com'}`
    },
    {
      icon: <Mail size={24} />,
      label: 'Email (Alt)',
      value: 'thomanemateusdique@outlook.pt',
      link: 'mailto:thomanemateusdique@outlook.pt'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: contactData.phone || '+258 84 019 0827',
      link: `tel:${(contactData.phone || '+258 84 019 0827').replace(/\s/g, '')}`
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone (Alt)',
      value: '+258 86 273 2529',
      link: 'tel:+258862732529'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: contactData.address || 'Mozambique',
      link: null
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'Tomane Mateus Tomane',
      link: contactData.socialLinks?.linkedin || 'https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123'
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'Tomane-Pd',
      link: contactData.socialLinks?.github || 'https://github.com/Tomane-Pd'
    }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <div className="contact-loading">
        <div className="container">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <SEO
        title="Contact"
        description="Get in touch to discuss data science, MEAL, AI, and development collaboration opportunities."
      />
      <section className="contact-hero">
        <div className="contact-hero-background"></div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.6 }} className="contact-hero-content">
            <span className="contact-hero-badge">Get in Touch</span>
            <h1 className="contact-hero-title">Let's Connect</h1>
            <p className="contact-hero-subtitle">Have a project in mind or want to collaborate? I'm always open to discussing data science, MEAL, AI, and development initiatives.</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }} className="contact-info">
              <h2>Contact Information</h2>
              <p>Feel free to reach out through any of the channels below. I'll get back to you as soon as possible.</p>

              <div className="contact-info-list">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-info-item">
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <span className="contact-info-label">{item.label}</span>
                      {item.link ? (
                        <a href={item.link} className="contact-info-value">{item.value}</a>
                      ) : (
                        <span className="contact-info-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <h3>Follow Me</h3>
                <div className="contact-social-links">
                  <a href={contactData.socialLinks?.linkedin || 'https://www.linkedin.com/in/tomane-mateus-tomane-7a5205123'} target="_blank" rel="noopener noreferrer" className="social-link linkedin"><Linkedin size={22} /></a>
                  <a href={contactData.socialLinks?.github || 'https://github.com/Tomane-Pd'} target="_blank" rel="noopener noreferrer" className="social-link github"><Github size={22} /></a>
                  <a href={`mailto:${contactData.email || 'padacius@gmail.com'}`} className="social-link email"><Mail size={22} /></a>
                  <a href="https://pmeal360.com" target="_blank" rel="noopener noreferrer" className="social-link website"><Briefcase size={22} /></a>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send a Message</h2>
                
                <div className="form-group">
                  <label htmlFor="name"><User size={18} />Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
                </div>

                <div className="form-group">
                  <label htmlFor="email"><Mail size={18} />Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject"><Briefcase size={18} />Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What's this about?" />
                </div>

                <div className="form-group">
                  <label htmlFor="message"><MessageSquare size={18} />Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Tell me about your project or inquiry..." />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><Send size={18} />Send Message</>}
                </button>

                {formStatus === 'success' && (
                  <div className="form-success"><CheckCircle size={20} />Your email client should have opened with the message ready to send. If not, email me directly at {contactData.email || 'padacius@gmail.com'}.</div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="contact-cta-section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }} className="contact-cta-content">
            <h2>Let's Make an Impact Together</h2>
            <p>Whether you need data science expertise, MEAL support, or AI solutions, I'm here to help.</p>
            <a href={`mailto:${contactData.email || 'padacius@gmail.com'}`} className="btn-primary"><Mail size={20} />Email Me Directly</a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact