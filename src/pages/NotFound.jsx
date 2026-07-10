// src/pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/ProjectDetail.css'

const NotFound = () => {
  return (
    <div className="project-not-found">
      <SEO title="Page Not Found" noIndex />
      <div className="container">
        <h2>404 - Page not found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
