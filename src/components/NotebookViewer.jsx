// src/components/NotebookViewer.jsx
// Mostra um notebook Jupyter (convertido para /public/notebooks/<file>.json) directamente no site:
// texto (markdown), código Python com realce de sintaxe e resultados (texto, tabelas, gráficos, mapas).
import React, { useEffect, useMemo, useState } from 'react'
import { Copy, Check, Download, ExternalLink, Eye, EyeOff, Map as MapIcon, RefreshCw, AlertTriangle } from 'lucide-react'
import { highlightPython, renderMarkdown } from '../utils/notebookFormat'
import '../styles/NotebookViewer.css'

const REPO_NOTEBOOKS = 'https://github.com/Tomane-Pd/portfolio/blob/main/public/notebooks'
const COLAB = 'https://colab.research.google.com/github/Tomane-Pd/portfolio/blob/main/public/notebooks'

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) { /* clipboard indisponível */ }
  }
  return (
    <button type="button" className="nb-copy" onClick={copy} aria-label="Copy code">
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

const MapOutput = ({ src, sizeMB }) => {
  const [open, setOpen] = useState(false)
  if (!open) {
    return (
      <button type="button" className="nb-map-load" onClick={() => setOpen(true)}>
        <MapIcon size={18} />
        Load interactive map {sizeMB ? `(${sizeMB} MB)` : ''}
      </button>
    )
  }
  return (
    <div className="nb-map">
      <iframe src={src} title="Interactive map" loading="lazy" />
      <a href={src} target="_blank" rel="noopener noreferrer" className="nb-map-open">
        <ExternalLink size={14} /> Open full screen
      </a>
    </div>
  )
}

const Output = ({ output }) => {
  switch (output.type) {
    case 'image':
      return <img className="nb-output-image" src={output.src} alt="Notebook output chart" loading="lazy" />
    case 'html':
      return <div className="nb-output-html" dangerouslySetInnerHTML={{ __html: output.html }} />
    case 'map':
      return <MapOutput src={output.src} sizeMB={output.sizeMB} />
    case 'error':
      return <pre className="nb-output-text nb-output-error">{output.text}</pre>
    default:
      return <pre className="nb-output-text">{output.text}</pre>
  }
}

const CodeCell = ({ cell, index, showOutputs }) => {
  const html = useMemo(() => highlightPython(cell.source), [cell.source])
  return (
    <div className="nb-cell nb-code-cell">
      <div className="nb-prompt">In [{index}]</div>
      <div className="nb-cell-body">
        <div className="nb-code">
          <CopyButton text={cell.source} />
          <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
        </div>
        {showOutputs && cell.outputs?.length > 0 && (
          <div className="nb-outputs">
            {cell.outputs.map((o, i) => <Output key={i} output={o} />)}
          </div>
        )}
      </div>
    </div>
  )
}

const MarkdownCell = ({ cell }) => {
  const html = useMemo(() => renderMarkdown(cell.source), [cell.source])
  return (
    <div className="nb-cell nb-md-cell">
      <div className="nb-prompt" />
      <div className="nb-cell-body nb-markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const NotebookViewer = ({ file }) => {
  const [notebook, setNotebook] = useState(null)
  const [error, setError] = useState(false)
  const [showOutputs, setShowOutputs] = useState(true)

  useEffect(() => {
    let cancelled = false
    setNotebook(null)
    setError(false)
    fetch(`/notebooks/${file}.json`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(data => { if (!cancelled) setNotebook(data) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [file])

  if (error) {
    return (
      <div className="nb-state">
        <AlertTriangle size={28} />
        <p>Could not load this notebook.</p>
      </div>
    )
  }
  if (!notebook) {
    return (
      <div className="nb-state">
        <RefreshCw size={28} className="spinning" />
        <p>Loading code…</p>
      </div>
    )
  }

  let codeIndex = 0
  const codeCells = notebook.cells.filter(c => c.type === 'code').length
  const hasOutputs = notebook.cells.some(c => c.outputs?.length)

  return (
    <div className="nb-viewer">
      <div className="nb-toolbar">
        <div className="nb-toolbar-info">
          <span className="nb-file">{notebook.file}</span>
          <span className="nb-meta">Python · Jupyter Notebook · {codeCells} code cells</span>
        </div>
        <div className="nb-toolbar-actions">
          {hasOutputs && (
            <button type="button" className="nb-action" onClick={() => setShowOutputs(v => !v)}>
              {showOutputs ? <EyeOff size={16} /> : <Eye size={16} />}
              {showOutputs ? 'Hide outputs' : 'Show outputs'}
            </button>
          )}
          <a className="nb-action" href={`/notebooks/${notebook.file}`} download>
            <Download size={16} /> .ipynb
          </a>
          <a className="nb-action" href={`${COLAB}/${notebook.file}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} /> Open in Colab
          </a>
          <a className="nb-action" href={`${REPO_NOTEBOOKS}/${notebook.file}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} /> GitHub
          </a>
        </div>
      </div>
      <div className="nb-cells">
        {notebook.cells.map((cell, i) =>
          cell.type === 'code'
            ? <CodeCell key={i} cell={cell} index={++codeIndex} showOutputs={showOutputs} />
            : <MarkdownCell key={i} cell={cell} />
        )}
      </div>
    </div>
  )
}

// Bloco de código simples (para projetos com o campo `code` em vez de notebook)
export const CodeBlock = ({ code, title = 'script.py' }) => {
  const html = useMemo(() => highlightPython(code), [code])
  return (
    <div className="nb-viewer">
      <div className="nb-toolbar">
        <div className="nb-toolbar-info">
          <span className="nb-file">{title}</span>
          <span className="nb-meta">Python</span>
        </div>
      </div>
      <div className="nb-code nb-code-standalone">
        <CopyButton text={code} />
        <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
      </div>
    </div>
  )
}

export default NotebookViewer
