// src/pages/Admin.jsx
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'
import { useDropzone } from 'react-dropzone'
import {
  Lock,
  Unlock,
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  FileText,
  FileSpreadsheet,
  Image,
  Video,
  Code,
  FolderOpen,
  Download,
  Save,
  AlertCircle,
  CheckCircle,
  Loader2,
  Search,
  Filter,
  Grid,
  List,
  Link as LinkIcon,
  FileCode,
  BarChart3,
  Database,
  Globe,
  FolderTree,
  Calendar,
  Clock,
  ExternalLink,
  Github,
  Briefcase,
  Layers,
  GraduationCap,
  Briefcase as BriefcaseIcon,
  Code2,
  BookOpen,
  Mail,
  User,
  MapPin,
  Phone
} from 'lucide-react'
import SEO from '../components/SEO'
import '../styles/Admin.css'

const Admin = () => {
  const { 
    isAuthenticated, 
    login, 
    logout, 
    projects, 
    addProject,
    updateProject,
    deleteProject,
    uploadFile,
    getProjectFiles,
    deleteFile,
    contentData,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    addPublication,
    updatePublication,
    deletePublication,
    updateContact,
    getContentByType,
    ADMIN_USER,
    ADMIN_PASSWORD,
    isLoading
  } = useAdmin()

  // Estados gerais
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [notification, setNotification] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  // Estados do Admin
  const [contentType, setContentType] = useState('projects')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [uploadingFiles, setUploadingFiles] = useState({})
  const [projectFiles, setProjectFiles] = useState({})
  const [showFiles, setShowFiles] = useState(null)
  const [uploadProgress, setUploadProgress] = useState({})

  // Estados do formulário
  const [formData, setFormData] = useState({
    // Projetos
    title: '',
    category: 'Data Engineering',
    description: '',
    problem: '',
    objectives: [''],
    methodology: '',
    technologies: [''],
    results: [''],
    lessons: '',
    status: 'Active',
    date: new Date().getFullYear().toString(),
    github: '',
    live: '',
    image: '',
    projectType: 'code',
    fileLink: '',
    fileDescription: '',
    // Educação
    institution: '',
    location: '',
    period: '',
    type: '',
    skills: [''],
    // Experiência
    organization: '',
    role: '',
    responsibilities: [''],
    achievements: [''],
    // Skills
    skillName: '',
    skillLevel: '',
    skillCategory: '',
    // Publicações
    publicationTitle: '',
    journal: '',
    year: '',
    authors: '',
    link: '',
    // Contato
    email: '',
    phone: '',
    address: '',
    socialLinks: { linkedin: '', github: '', twitter: '' }
  })

  // Tipos de conteúdo
  const contentTypes = [
    { id: 'projects', label: 'Projetos', icon: <FolderOpen size={18} /> },
    { id: 'education', label: 'Educação', icon: <GraduationCap size={18} /> },
    { id: 'experience', label: 'Experiência', icon: <BriefcaseIcon size={18} /> },
    { id: 'skills', label: 'Habilidades', icon: <Code2 size={18} /> },
    { id: 'publications', label: 'Publicações', icon: <BookOpen size={18} /> },
    { id: 'contact', label: 'Contato', icon: <Mail size={18} /> }
  ]

  // Tipos de projeto
  const projectTypes = [
    { id: 'code', label: 'Código (Python, R, etc)', icon: <Code size={18} /> },
    { id: 'dashboard', label: 'Dashboard (PowerBI, Tableau)', icon: <BarChart3 size={18} /> },
    { id: 'excel', label: 'Excel / Planilhas', icon: <FileSpreadsheet size={18} /> },
    { id: 'html', label: 'HTML / Website', icon: <Globe size={18} /> },
    { id: 'r', label: 'Projeto em R', icon: <FileCode size={18} /> },
    { id: 'python', label: 'Python Notebook', icon: <Code size={18} /> },
    { id: 'pdf', label: 'Documento PDF', icon: <FileText size={18} /> },
    { id: 'image', label: 'Imagem / Screenshot', icon: <Image size={18} /> },
    { id: 'video', label: 'Vídeo Demonstrativo', icon: <Video size={18} /> },
    { id: 'link', label: 'Link / URL', icon: <LinkIcon size={18} /> },
    { id: 'other', label: 'Outros', icon: <FolderOpen size={18} /> }
  ]

  // Categorias
  const categories = [
    'All',
    'Data Engineering',
    'Data Science',
    'Machine Learning',
    'Platform',
    'Research',
    'Other'
  ]

  // Notificações
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // ===== FUNÇÕES DO ADMIN =====

  // Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (login(username, password)) {
      setLoginError(false)
      setUsername('')
      setPassword('')
      showNotification('Login realizado com sucesso!', 'success')
    } else {
      setLoginError(true)
    }
  }

  const handleLogout = () => {
    logout()
    showNotification('Logout realizado com sucesso!', 'success')
  }

  // ===== FORMULÁRIO =====

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...(prev[field] || [])]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Data Engineering',
      description: '',
      problem: '',
      objectives: [''],
      methodology: '',
      technologies: [''],
      results: [''],
      lessons: '',
      status: 'Active',
      date: new Date().getFullYear().toString(),
      github: '',
      live: '',
      image: '',
      projectType: 'code',
      fileLink: '',
      fileDescription: '',
      institution: '',
      location: '',
      period: '',
      type: '',
      skills: [''],
      organization: '',
      role: '',
      responsibilities: [''],
      achievements: [''],
      skillName: '',
      skillLevel: '',
      skillCategory: '',
      publicationTitle: '',
      journal: '',
      year: '',
      authors: '',
      link: '',
      email: '',
      phone: '',
      address: '',
      socialLinks: { linkedin: '', github: '', twitter: '' }
    })
    setEditingItem(null)
    setShowAddForm(false)
  }

  const openNewForm = () => {
    resetForm()
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    setShowAddForm(false)
    resetForm()
  }

  // ===== SUBMIT =====

  const handleSubmit = (e) => {
    e.preventDefault()

    switch(contentType) {
      case 'projects':
        handleSubmitProject()
        break
      case 'education':
        handleSubmitEducation()
        break
      case 'experience':
        handleSubmitExperience()
        break
      case 'skills':
        handleSubmitSkill()
        break
      case 'publications':
        handleSubmitPublication()
        break
      case 'contact':
        handleSubmitContact()
        break
      default:
        break
    }
  }

  // Projects
  const handleSubmitProject = () => {
    const projectData = {
      ...formData,
      objectives: formData.objectives.filter(o => o.trim() !== ''),
      technologies: formData.technologies.filter(t => t.trim() !== ''),
      results: formData.results.filter(r => r.trim() !== ''),
      materials: []
    }

    if (formData.fileLink) {
      projectData.materials.push({
        type: formData.projectType,
        label: formData.fileDescription || 'Arquivo do Projeto',
        icon: formData.projectType,
        url: formData.fileLink
      })
    }

    if (editingItem) {
      updateProject(editingItem.id, projectData)
      showNotification('Projeto atualizado com sucesso!', 'success')
    } else {
      addProject(projectData)
      showNotification('Projeto adicionado com sucesso!', 'success')
    }
    
    setShowAddForm(false)
    resetForm()
  }

  // Education
  const handleSubmitEducation = () => {
    const data = {
      title: formData.title,
      institution: formData.institution,
      location: formData.location,
      period: formData.period,
      type: formData.type,
      description: formData.description,
      skills: formData.skills.filter(s => s.trim() !== '')
    }

    if (editingItem) {
      updateEducation(editingItem.id, data)
      showNotification('Educação atualizada com sucesso!', 'success')
    } else {
      addEducation(data)
      showNotification('Educação adicionada com sucesso!', 'success')
    }
    
    setShowAddForm(false)
    resetForm()
  }

  // Experience
  const handleSubmitExperience = () => {
    const data = {
      organization: formData.organization,
      role: formData.role,
      period: formData.period,
      location: formData.location,
      description: formData.description,
      responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
      achievements: formData.achievements.filter(a => a.trim() !== '')
    }

    if (editingItem) {
      updateExperience(editingItem.id, data)
      showNotification('Experiência atualizada com sucesso!', 'success')
    } else {
      addExperience(data)
      showNotification('Experiência adicionada com sucesso!', 'success')
    }
    
    setShowAddForm(false)
    resetForm()
  }

  // Skills
  const handleSubmitSkill = () => {
    const data = {
      name: formData.skillName,
      level: parseInt(formData.skillLevel) || 50,
      category: formData.skillCategory,
      description: formData.description
    }

    if (editingItem) {
      updateSkill(editingItem.id, data)
      showNotification('Habilidade atualizada com sucesso!', 'success')
    } else {
      addSkill(data)
      showNotification('Habilidade adicionada com sucesso!', 'success')
    }
    
    setShowAddForm(false)
    resetForm()
  }

  // Publications
  const handleSubmitPublication = () => {
    const data = {
      title: formData.publicationTitle,
      journal: formData.journal,
      year: formData.year,
      authors: formData.authors,
      description: formData.description,
      link: formData.link
    }

    if (editingItem) {
      updatePublication(editingItem.id, data)
      showNotification('Publicação atualizada com sucesso!', 'success')
    } else {
      addPublication(data)
      showNotification('Publicação adicionada com sucesso!', 'success')
    }
    
    setShowAddForm(false)
    resetForm()
  }

  // Contact
  const handleSubmitContact = () => {
    const data = {
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      socialLinks: formData.socialLinks
    }

    updateContact(data)
    showNotification('Contato atualizado com sucesso!', 'success')
    setShowAddForm(false)
    resetForm()
  }

  // ===== EDIÇÃO =====

  const handleEdit = (item) => {
    switch(contentType) {
      case 'projects':
        setFormData({
          ...formData,
          title: item.title || '',
          category: item.category || 'Data Engineering',
          description: item.description || '',
          problem: item.problem || '',
          objectives: item.objectives || [''],
          methodology: item.methodology || '',
          technologies: item.technologies || [''],
          results: item.results || [''],
          lessons: item.lessons || '',
          status: item.status || 'Active',
          date: item.date || new Date().getFullYear().toString(),
          github: item.github || '',
          live: item.live || '',
          image: item.image || '',
          projectType: 'code',
          fileLink: '',
          fileDescription: ''
        })
        break
      case 'education':
        setFormData({
          ...formData,
          title: item.title || '',
          institution: item.institution || '',
          location: item.location || '',
          period: item.period || '',
          type: item.type || '',
          description: item.description || '',
          skills: item.skills || ['']
        })
        break
      case 'experience':
        setFormData({
          ...formData,
          organization: item.organization || '',
          role: item.role || '',
          period: item.period || '',
          location: item.location || '',
          description: item.description || '',
          responsibilities: item.responsibilities || [''],
          achievements: item.achievements || ['']
        })
        break
      case 'skills':
        setFormData({
          ...formData,
          skillName: item.name || '',
          skillLevel: item.level || 50,
          skillCategory: item.category || '',
          description: item.description || ''
        })
        break
      case 'publications':
        setFormData({
          ...formData,
          publicationTitle: item.title || '',
          journal: item.journal || '',
          year: item.year || '',
          authors: item.authors || '',
          description: item.description || '',
          link: item.link || ''
        })
        break
      default:
        break
    }
    setEditingItem(item)
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ===== DELETE =====

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      switch(contentType) {
        case 'projects':
          deleteProject(id)
          break
        case 'education':
          deleteEducation(id)
          break
        case 'experience':
          deleteExperience(id)
          break
        case 'skills':
          deleteSkill(id)
          break
        case 'publications':
          deletePublication(id)
          break
        default:
          break
      }
      showNotification('Item excluído com sucesso!', 'success')
    }
  }

  // ===== UPLOAD DE ARQUIVOS =====

  const handleFileUpload = async (files, projectId) => {
    setUploadingFiles(prev => ({ ...prev, [projectId]: true }))
    
    try {
      const uploadedFiles = []
      for (const file of files) {
        let type = 'other'
        if (file.type.includes('image')) type = 'image'
        else if (file.type.includes('video')) type = 'video'
        else if (file.name.endsWith('.pbix')) type = 'powerbi'
        else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) type = 'excel'
        else if (file.name.endsWith('.py') || file.name.endsWith('.ipynb')) type = 'code'
        else if (file.type.includes('pdf')) type = 'pdf'
        
        const result = await uploadFile(file, projectId, type)
        uploadedFiles.push(result)
        
        setUploadProgress(prev => ({
          ...prev,
          [projectId]: ((uploadedFiles.length / files.length) * 100)
        }))
      }
      
      const filesList = getProjectFiles(projectId)
      setProjectFiles(prev => ({ ...prev, [projectId]: filesList }))
      
      showNotification(`${uploadedFiles.length} arquivo(s) enviado(s) com sucesso!`, 'success')
    } catch (error) {
      showNotification('Erro ao fazer upload dos arquivos', 'error')
    } finally {
      setUploadingFiles(prev => ({ ...prev, [projectId]: false }))
      setUploadProgress(prev => ({ ...prev, [projectId]: 0 }))
    }
  }

  const handleDeleteFile = (fileId, projectId) => {
    if (window.confirm('Tem certeza que deseja excluir este arquivo?')) {
      deleteFile(fileId, projectId)
      const files = getProjectFiles(projectId)
      setProjectFiles(prev => ({ ...prev, [projectId]: files }))
      showNotification('Arquivo excluído com sucesso!', 'success')
    }
  }

  const toggleFiles = (projectId) => {
    if (showFiles === projectId) {
      setShowFiles(null)
    } else {
      const files = getProjectFiles(projectId)
      setProjectFiles(prev => ({ ...prev, [projectId]: files }))
      setShowFiles(projectId)
    }
  }

  // ===== FILTROS =====

  const getCurrentItems = () => {
    switch(contentType) {
      case 'projects': return projects
      case 'education': return contentData.education || []
      case 'experience': return contentData.experience || []
      case 'skills': return contentData.skills || []
      case 'publications': return contentData.publications || []
      default: return []
    }
  }

  const currentItems = getCurrentItems()

  const filteredItems = currentItems.filter(item => {
    const search = searchTerm.toLowerCase()
    switch(contentType) {
      case 'projects':
        return item.title?.toLowerCase().includes(search) ||
               item.description?.toLowerCase().includes(search)
      case 'education':
        return item.title?.toLowerCase().includes(search) ||
               item.institution?.toLowerCase().includes(search)
      case 'experience':
        return item.organization?.toLowerCase().includes(search) ||
               item.role?.toLowerCase().includes(search)
      case 'skills':
        return item.name?.toLowerCase().includes(search) ||
               item.category?.toLowerCase().includes(search)
      case 'publications':
        return item.title?.toLowerCase().includes(search) ||
               item.journal?.toLowerCase().includes(search)
      default:
        return true
    }
  })

  // ===== DROPZONE =====

  const FileDropzone = ({ projectId }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (files) => handleFileUpload(files, projectId),
      maxSize: 104857600
    })

    const progress = uploadProgress[projectId] || 0
    const isUploading = uploadingFiles[projectId]

    return (
      <div className="dropzone-wrapper">
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <Upload size={32} />
            <p className="dropzone-text">
              {isDragActive ? 'Solte os arquivos aqui...' : 'Arraste arquivos ou clique para selecionar'}
            </p>
            <span className="dropzone-hint">Suporta: Imagens, PDFs, Excel, PowerBI, Python, Vídeos (até 100MB)</span>
          </div>
        </div>

        {isUploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
    )
  }

  // ===== RENDERIZAÇÃO DO FORMULÁRIO =====

  const renderFormFields = () => {
    switch(contentType) {
      case 'projects':
        return renderProjectForm()
      case 'education':
        return renderEducationForm()
      case 'experience':
        return renderExperienceForm()
      case 'skills':
        return renderSkillForm()
      case 'publications':
        return renderPublicationForm()
      case 'contact':
        return renderContactForm()
      default:
        return null
    }
  }

  const renderProjectForm = () => (
    <>
      <div className="form-section">
        <h3 className="form-section-title"><Layers size={18} /> Informações Básicas</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Título do Projeto *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Ex: Análise de Dados" />
          </div>
          <div className="form-group">
            <label>Categoria *</label>
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="Data Engineering">Engenharia de Dados</option>
              <option value="Data Science">Ciência de Dados</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Platform">Plataforma</option>
              <option value="Research">Pesquisa</option>
              <option value="Other">Outros</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Descrição *</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" placeholder="Descreva brevemente o projeto" />
        </div>
        <div className="form-group">
          <label>Problema Resolvido *</label>
          <textarea name="problem" value={formData.problem} onChange={handleInputChange} required rows="2" placeholder="Qual problema este projeto resolve?" />
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title"><FolderTree size={18} /> Detalhes do Projeto</h3>
        <div className="form-group">
          <label>Objetivos</label>
          {formData.objectives.map((obj, index) => (
            <div key={index} className="array-input">
              <input type="text" value={obj} onChange={(e) => handleArrayChange('objectives', index, e.target.value)} placeholder={`Objetivo ${index + 1}`} />
              {formData.objectives.length > 1 && <button type="button" onClick={() => removeArrayItem('objectives', index)} className="remove-btn"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('objectives')} className="add-btn"><Plus size={16} /> Adicionar Objetivo</button>
        </div>
        <div className="form-group">
          <label>Metodologia</label>
          <textarea name="methodology" value={formData.methodology} onChange={handleInputChange} rows="3" placeholder="Como o projeto foi desenvolvido?" />
        </div>
        <div className="form-group">
          <label>Tecnologias Utilizadas</label>
          {formData.technologies.map((tech, index) => (
            <div key={index} className="array-input">
              <input type="text" value={tech} onChange={(e) => handleArrayChange('technologies', index, e.target.value)} placeholder={`Tecnologia ${index + 1}`} />
              {formData.technologies.length > 1 && <button type="button" onClick={() => removeArrayItem('technologies', index)} className="remove-btn"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('technologies')} className="add-btn"><Plus size={16} /> Adicionar Tecnologia</button>
        </div>
        <div className="form-group">
          <label>Resultados Alcançados</label>
          {formData.results.map((result, index) => (
            <div key={index} className="array-input">
              <input type="text" value={result} onChange={(e) => handleArrayChange('results', index, e.target.value)} placeholder={`Resultado ${index + 1}`} />
              {formData.results.length > 1 && <button type="button" onClick={() => removeArrayItem('results', index)} className="remove-btn"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('results')} className="add-btn"><Plus size={16} /> Adicionar Resultado</button>
        </div>
        <div className="form-group">
          <label>Lições Aprendidas</label>
          <textarea name="lessons" value={formData.lessons} onChange={handleInputChange} rows="2" placeholder="O que foi aprendido com este projeto?" />
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title"><Upload size={18} /> Arquivo ou Link do Projeto</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Projeto</label>
            <select name="projectType" value={formData.projectType} onChange={handleInputChange}>
              {projectTypes.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Active">Ativo</option>
              <option value="Deployed">Implantado</option>
              <option value="Completed">Concluído</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Link do Projeto (URL)</label>
          <div className="input-with-icon"><LinkIcon size={18} /><input type="url" name="fileLink" value={formData.fileLink} onChange={handleInputChange} placeholder="https://github.com/... ou https://drive.google.com/..." /></div>
        </div>
        <div className="form-group">
          <label>Descrição do Arquivo/Link</label>
          <input type="text" name="fileDescription" value={formData.fileDescription} onChange={handleInputChange} placeholder="Ex: Código Python do projeto, Dashboard PowerBI..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>GitHub URL</label>
            <div className="input-with-icon"><Github size={18} /><input type="url" name="github" value={formData.github} onChange={handleInputChange} placeholder="https://github.com/..." /></div>
          </div>
          <div className="form-group">
            <label>Live Demo URL</label>
            <div className="input-with-icon"><ExternalLink size={18} /><input type="url" name="live" value={formData.live} onChange={handleInputChange} placeholder="https://..." /></div>
          </div>
        </div>
        <div className="form-group">
          <label>URL da Imagem de Capa</label>
          <div className="input-with-icon"><Image size={18} /><input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="/images/projects/meu-projeto.jpg" /></div>
        </div>
        <div className="form-group">
          <label>Ano</label>
          <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="2024" />
        </div>
      </div>
    </>
  )

  const renderEducationForm = () => (
    <>
      <div className="form-section">
        <h3 className="form-section-title"><GraduationCap size={18} /> Dados da Formação</h3>
        <div className="form-group">
          <label>Título do Curso *</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Ex: MBA em Ciência de Dados" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Instituição *</label>
            <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} required placeholder="Nome da instituição" />
          </div>
          <div className="form-group">
            <label>Localização</label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Cidade, País" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Período *</label>
            <input type="text" name="period" value={formData.period} onChange={handleInputChange} required placeholder="2024 - 2026" />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select name="type" value={formData.type} onChange={handleInputChange}>
              <option value="">Selecione...</option>
              <option value="MBA">MBA</option>
              <option value="Postgraduate">Pós-Graduação</option>
              <option value="Bachelor">Licenciatura</option>
              <option value="Master">Mestrado</option>
              <option value="PhD">Doutorado</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Descreva o curso e seus diferenciais" />
        </div>
        <div className="form-group">
          <label>Habilidades Adquiridas</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="array-input">
              <input type="text" value={skill} onChange={(e) => handleArrayChange('skills', index, e.target.value)} placeholder={`Habilidade ${index + 1}`} />
              {formData.skills.length > 1 && <button type="button" onClick={() => removeArrayItem('skills', index)} className="remove-btn"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('skills')} className="add-btn"><Plus size={16} /> Adicionar Habilidade</button>
        </div>
      </div>
    </>
  )

  const renderExperienceForm = () => (
    <>
      <div className="form-section">
        <h3 className="form-section-title"><BriefcaseIcon size={18} /> Dados da Experiência</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Organização *</label>
            <input type="text" name="organization" value={formData.organization} onChange={handleInputChange} required placeholder="Nome da organização" />
          </div>
          <div className="form-group">
            <label>Cargo *</label>
            <input type="text" name="role" value={formData.role} onChange={handleInputChange} required placeholder="Seu cargo" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Período *</label>
            <input type="text" name="period" value={formData.period} onChange={handleInputChange} required placeholder="2024 - Presente" />
          </div>
          <div className="form-group">
            <label>Localização</label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Cidade, País" />
          </div>
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Descreva suas atividades principais" />
        </div>
        <div className="form-group">
          <label>Responsabilidades</label>
          {formData.responsibilities.map((resp, index) => (
            <div key={index} className="array-input">
              <input type="text" value={resp} onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)} placeholder={`Responsabilidade ${index + 1}`} />
              {formData.responsibilities.length > 1 && <button type="button" onClick={() => removeArrayItem('responsibilities', index)} className="remove-btn"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('responsibilities')} className="add-btn"><Plus size={16} /> Adicionar Responsabilidade</button>
        </div>
        <div className="form-group">
          <label>Conquistas</label>
          {formData.achievements.map((ach, index) => (
            <div key={index} className="array-input">
              <input type="text" value={ach} onChange={(e) => handleArrayChange('achievements', index, e.target.value)} placeholder={`Conquista ${index + 1}`} />
              {formData.achievements.length > 1 && <button type="button" onClick={() => removeArrayItem('achievements', index)} className="remove-btn"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('achievements')} className="add-btn"><Plus size={16} /> Adicionar Conquista</button>
        </div>
      </div>
    </>
  )

  const renderSkillForm = () => (
    <>
      <div className="form-section">
        <h3 className="form-section-title"><Code2 size={18} /> Dados da Habilidade</h3>
        <div className="form-group">
          <label>Nome da Habilidade *</label>
          <input type="text" name="skillName" value={formData.skillName} onChange={handleInputChange} required placeholder="Ex: Python, SQL, Power BI..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nível (%)</label>
            <input type="number" name="skillLevel" value={formData.skillLevel} onChange={handleInputChange} min="0" max="100" placeholder="85" />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select name="skillCategory" value={formData.skillCategory} onChange={handleInputChange}>
              <option value="">Selecione...</option>
              <option value="programming">Programação</option>
              <option value="data">Dados & Analytics</option>
              <option value="visualization">Visualização</option>
              <option value="ml">Machine Learning & AI</option>
              <option value="gis">GIS & Mapeamento</option>
              <option value="meal">MEAL & Pesquisa</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" placeholder="Descreva sua experiência com esta habilidade" />
        </div>
      </div>
    </>
  )

  const renderPublicationForm = () => (
    <>
      <div className="form-section">
        <h3 className="form-section-title"><BookOpen size={18} /> Dados da Publicação</h3>
        <div className="form-group">
          <label>Título da Publicação *</label>
          <input type="text" name="publicationTitle" value={formData.publicationTitle} onChange={handleInputChange} required placeholder="Título do artigo ou publicação" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Periódico / Revista</label>
            <input type="text" name="journal" value={formData.journal} onChange={handleInputChange} placeholder="Nome do periódico" />
          </div>
          <div className="form-group">
            <label>Ano</label>
            <input type="text" name="year" value={formData.year} onChange={handleInputChange} placeholder="2024" />
          </div>
        </div>
        <div className="form-group">
          <label>Autores</label>
          <input type="text" name="authors" value={formData.authors} onChange={handleInputChange} placeholder="Tomane, T.M., et al." />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Resumo da publicação" />
        </div>
        <div className="form-group">
          <label>Link da Publicação</label>
          <div className="input-with-icon"><ExternalLink size={18} /><input type="url" name="link" value={formData.link} onChange={handleInputChange} placeholder="https://..." /></div>
        </div>
      </div>
    </>
  )

  const renderContactForm = () => (
    <>
      <div className="form-section">
        <h3 className="form-section-title"><Mail size={18} /> Informações de Contato</h3>
        <div className="form-group">
          <label>Email</label>
          <div className="input-with-icon"><Mail size={18} /><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" /></div>
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <div className="input-with-icon"><Phone size={18} /><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+258 84 019 0827" /></div>
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <div className="input-with-icon"><MapPin size={18} /><input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Cidade, País" /></div>
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <div className="input-with-icon"><User size={18} /><input type="url" name="socialLinks.linkedin" value={formData.socialLinks?.linkedin || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, linkedin: e.target.value } }))} placeholder="https://linkedin.com/in/..." /></div>
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <div className="input-with-icon"><Github size={18} /><input type="url" name="socialLinks.github" value={formData.socialLinks?.github || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, github: e.target.value } }))} placeholder="https://github.com/..." /></div>
        </div>
      </div>
    </>
  )

  // ===== RENDERIZAÇÃO DA LISTA =====

  const renderItemList = () => {
    switch(contentType) {
      case 'projects':
        return renderProjectList()
      case 'education':
        return renderSimpleList('Educação', 'institution')
      case 'experience':
        return renderSimpleList('Experiência', 'organization')
      case 'skills':
        return renderSkillList()
      case 'publications':
        return renderSimpleList('Publicação', 'journal')
      default:
        return null
    }
  }

  const renderProjectList = () => (
    filteredItems.map((project) => (
      <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.4 }} className="admin-project-card">
        <div className="admin-project-image">
          <img src={project.image || '/images/projects/placeholder.svg'} alt={project.title} onError={(e) => { e.target.onerror = null; e.target.src = '/images/projects/placeholder.svg' }} />
          <div className="admin-project-status">
            <span className={`status-badge ${project.status?.toLowerCase() || 'active'}`}>
              {project.status === 'Active' ? 'Ativo' : project.status === 'Deployed' ? 'Implantado' : 'Concluído'}
            </span>
          </div>
        </div>
        <div className="admin-project-content">
          <div className="admin-project-header">
            <h3>{project.title}</h3>
            <span className="admin-project-category">{project.category}</span>
          </div>
          <p className="admin-project-description">{project.description}</p>
          <div className="admin-project-tech">
            {project.technologies?.slice(0, 4).map((tech, idx) => <span key={idx} className="tech-tag">{tech}</span>)}
            {project.technologies?.length > 4 && <span className="tech-tag more">+{project.technologies.length - 4}</span>}
          </div>
          <div className="admin-project-actions">
            <button className="admin-action edit" onClick={() => handleEdit(project)}><Edit size={16} /> Editar</button>
            <button className="admin-action files" onClick={() => toggleFiles(project.id)}><Upload size={16} /> Arquivos {projectFiles[project.id]?.length > 0 && <span className="file-count">{projectFiles[project.id].length}</span>}</button>
            <button className="admin-action delete" onClick={() => handleDelete(project.id)}><Trash2 size={16} /> Excluir</button>
          </div>
          <AnimatePresence>
            {showFiles === project.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="admin-project-files">
                <h4>Gerenciar Arquivos</h4>
                <FileDropzone projectId={project.id} />
                <div className="project-files-list">
                  {projectFiles[project.id]?.length > 0 ? (
                    projectFiles[project.id].map((file, idx) => (
                      <div key={idx} className="file-item">
                        <div className="file-icon">{file.type?.includes('image') && <Image size={18} />}{file.name?.endsWith('.pbix') && <FileSpreadsheet size={18} />}{file.name?.endsWith('.py') && <Code size={18} />}{file.name?.endsWith('.pdf') && <FileText size={18} />}{file.name?.endsWith('.xlsx') && <FileSpreadsheet size={18} />}{file.type?.includes('video') && <Video size={18} />}{!file.type && <FileText size={18} />}</div>
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                        <a href={file.data} download={file.name} className="file-download" title="Download"><Download size={16} /></a>
                        <button onClick={() => handleDeleteFile(file.id, project.id)} className="file-delete" title="Excluir"><X size={16} /></button>
                      </div>
                    ))
                  ) : <p className="no-files">Nenhum arquivo enviado</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    ))
  )

  const renderSimpleList = (label, subtitleKey) => (
    filteredItems.map((item) => (
      <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.3 }} className="admin-simple-item">
        <div className="admin-simple-content">
          <h3>{item.title || item.name || 'Sem título'}</h3>
          <p>{item[subtitleKey] || item.organization || item.institution || ''}</p>
        </div>
        <div className="admin-simple-actions">
          <button className="admin-action edit" onClick={() => handleEdit(item)}><Edit size={16} /> Editar</button>
          <button className="admin-action delete" onClick={() => handleDelete(item.id)}><Trash2 size={16} /> Excluir</button>
        </div>
      </motion.div>
    ))
  )

  const renderSkillList = () => (
    filteredItems.map((item) => (
      <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.3 }} className="admin-simple-item">
        <div className="admin-simple-content">
          <h3>{item.name}</h3>
          <p>{item.category} • {item.level}%</p>
        </div>
        <div className="admin-simple-actions">
          <button className="admin-action edit" onClick={() => handleEdit(item)}><Edit size={16} /> Editar</button>
          <button className="admin-action delete" onClick={() => handleDelete(item.id)}><Trash2 size={16} /> Excluir</button>
        </div>
      </motion.div>
    ))
  )

  // ===== ANIMAÇÕES =====

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // ===== TELA DE LOGIN =====

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <SEO title="Admin" noIndex />
        <div className="admin-login-container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.6 }} className="admin-login-box">
            <div className="admin-login-icon"><Lock size={48} /></div>
            <h1>Acesso Administrativo</h1>
            <p>Digite suas credenciais para gerenciar o conteúdo</p>
            <form onSubmit={handleLogin}>
              <div className="admin-login-input">
                <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
              </div>
              <div className="admin-login-input">
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {loginError && <div className="admin-login-error"><AlertCircle size={16} /> Usuário ou senha incorretos. Tente novamente.</div>}
              <button type="submit" className="btn-primary"><Unlock size={18} /> Entrar</button>
            </form>
          </motion.div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="admin-loading">
        <Loader2 size={40} className="spinning" />
        <p>Carregando...</p>
      </div>
    )
  }

  // ===== RENDER PRINCIPAL =====

  return (
    <div className="admin-page">
      <SEO title="Admin" noIndex />
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className={`admin-notification ${notification.type}`}>
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div className="admin-header-left">
              <h1><Briefcase size={24} /> Painel de Administração</h1>
              <span className="admin-project-count">{currentItems.length} itens</span>
            </div>
            <div className="admin-header-actions">
              <button className="btn-logout" onClick={handleLogout}><Lock size={18} /> Sair</button>
            </div>
          </div>
        </div>
      </header>

      {/* Seletor de Tipo de Conteúdo */}
      <section className="admin-content-selector">
        <div className="container">
          <div className="content-types">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                className={`content-type-btn ${contentType === type.id ? 'active' : ''}`}
                onClick={() => {
                  setContentType(type.id)
                  setSearchTerm('')
                  setFilterCategory('all')
                  setShowAddForm(false)
                }}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Botão Adicionar */}
      <section className="admin-add-section">
        <div className="container">
          <div className="admin-add-project-wrapper">
            <button className="btn-primary add-project-btn" onClick={openNewForm}>
              <Plus size={20} />
              Adicionar {contentTypes.find(t => t.id === contentType)?.label || 'Conteúdo'}
            </button>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="admin-form-container">
            <div className="container">
              <div className="admin-form-card">
                <div className="admin-form-header">
                  <div className="admin-form-header-left">
                    <h2>{editingItem ? <Edit size={22} /> : <Plus size={22} />}{editingItem ? 'Editar' : 'Novo'} {contentTypes.find(t => t.id === contentType)?.label || 'Item'}</h2>
                    <span className="form-subtitle">{editingItem ? 'Atualize as informações' : 'Preencha os dados para adicionar'}</span>
                  </div>
                  <button className="close-btn" onClick={handleCancel}><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="admin-form">
                  {renderFormFields()}
                  <div className="admin-form-actions">
                    <button type="submit" className="btn-primary"><Save size={18} /> {editingItem ? 'Atualizar' : 'Salvar'}</button>
                    <button type="button" className="btn-secondary" onClick={handleCancel}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de Itens */}
      <section className="admin-projects-section">
        <div className="container">
          <div className="admin-projects-header">
            <div className="admin-projects-header-left">
              <h2>{contentTypes.find(t => t.id === contentType)?.label || 'Itens'}</h2>
              <span className="projects-count">{filteredItems.length} itens</span>
            </div>
            <div className="admin-projects-controls">
              <div className="search-box">
                <Search size={18} />
                <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="view-toggle">
                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={18} /></button>
              </div>
            </div>
          </div>

          <div className={`admin-items-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredItems.length === 0 ? (
              <div className="admin-empty-state">
                <FolderOpen size={48} />
                <h3>Nenhum item encontrado</h3>
                <p>Clique em "Adicionar" para criar seu primeiro item</p>
              </div>
            ) : (
              renderItemList()
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admin