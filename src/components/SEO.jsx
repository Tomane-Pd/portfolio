// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, noIndex = false }) => {
  const fullTitle = `${title} | Tomane Mateus Tomane`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  )
}

export default SEO
