// src/context/AdminContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { mergeProjects, markProjectDeleted } from '../utils/projectsStore'

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [projects, setProjects] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [contentData, setContentData] = useState({
    education: [],
    experience: [],
    skills: [],
    publications: [],
    contact: {}
  })

  const ADMIN_USER = 'padacius'
  const ADMIN_PASSWORD = 'Ellamore54'

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // ===== CARREGAR DADOS DO LOCALSTORAGE =====
  const loadAllData = () => {
    // Projetos (semeia com os projetos padrão na primeira vez, para o Admin editar/excluir os mesmos que os visitantes veem)
    const savedProjects = localStorage.getItem('portfolio_projects')
    // mergeProjects garante que projetos novos do código aparecem mesmo com dados antigos guardados
    if (savedProjects) {
      try {
        setProjects(mergeProjects(JSON.parse(savedProjects)))
      } catch (e) {
        setProjects(mergeProjects([]))
      }
    } else {
      setProjects(mergeProjects([]))
    }

    // Arquivos
    const savedFiles = localStorage.getItem('portfolio_uploaded_files')
    if (savedFiles) {
      try {
        setUploadedFiles(JSON.parse(savedFiles))
      } catch (e) {
        setUploadedFiles({})
      }
    }

    // Conteúdo
    const savedContent = localStorage.getItem('portfolio_content_data')
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        setContentData({
          education: parsed.education || [],
          experience: parsed.experience || [],
          skills: parsed.skills || [],
          publications: parsed.publications || [],
          contact: parsed.contact || {}
        })
      } catch (e) {
        setContentData({
          education: [],
          experience: [],
          skills: [],
          publications: [],
          contact: {}
        })
      }
    } else {
      setContentData({
        education: [],
        experience: [],
        skills: [],
        publications: [],
        contact: {}
      })
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    loadAllData()
    
    const handleStorageChange = () => { loadAllData() }
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // ===== SALVAR E SINCRONIZAR =====
  const saveProjectsAndSync = (newProjects) => {
    setProjects(newProjects)
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects))
    window.dispatchEvent(new Event('storage'))
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { type: 'projects' } }))
  }

  const saveContentAndSync = (newContent) => {
    setContentData(newContent)
    localStorage.setItem('portfolio_content_data', JSON.stringify(newContent))
    window.dispatchEvent(new Event('storage'))
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { type: 'content' } }))
  }

  const saveFilesAndSync = (newFiles) => {
    setUploadedFiles(newFiles)
    localStorage.setItem('portfolio_uploaded_files', JSON.stringify(newFiles))
    window.dispatchEvent(new Event('storage'))
  }

  // ===== LOGIN / LOGOUT =====
  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('portfolio_admin', 'true')
      localStorage.setItem('portfolio_admin_user', username)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('portfolio_admin')
    localStorage.removeItem('portfolio_admin_user')
    showNotification('Logout realizado com sucesso!', 'success')
  }

  useEffect(() => {
    const adminStatus = localStorage.getItem('portfolio_admin')
    if (adminStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // ===== CRUD PROJETOS =====
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now().toString(), createdAt: new Date().toISOString(), files: [] }
    const updated = [...projects, newProject]
    saveProjectsAndSync(updated)
    showNotification('Projeto adicionado com sucesso!', 'success')
    return newProject
  }

  const updateProject = (id, updatedData) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedData, editedAt: new Date().toISOString() } : p)
    saveProjectsAndSync(updated)
    showNotification('Projeto atualizado com sucesso!', 'success')
  }

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id)
    markProjectDeleted(id)
    saveProjectsAndSync(updated)
    const newFiles = { ...uploadedFiles }
    delete newFiles[id]
    saveFilesAndSync(newFiles)
    showNotification('Projeto excluído com sucesso!', 'success')
  }

  const getAllProjects = () => projects

  // ===== CRUD EDUCAÇÃO =====
  const addEducation = (item) => {
    const newItem = { ...item, id: Date.now().toString(), createdAt: new Date().toISOString() }
    const updated = [...contentData.education, newItem]
    saveContentAndSync({ ...contentData, education: updated })
    showNotification('Educação adicionada com sucesso!', 'success')
    return newItem
  }

  const updateEducation = (id, updatedData) => {
    const updated = contentData.education.map(item => item.id === id ? { ...item, ...updatedData } : item)
    saveContentAndSync({ ...contentData, education: updated })
    showNotification('Educação atualizada com sucesso!', 'success')
  }

  const deleteEducation = (id) => {
    const updated = contentData.education.filter(item => item.id !== id)
    saveContentAndSync({ ...contentData, education: updated })
    showNotification('Educação excluída com sucesso!', 'success')
  }

  // ===== CRUD EXPERIÊNCIA =====
  const addExperience = (item) => {
    const newItem = { ...item, id: Date.now().toString(), createdAt: new Date().toISOString() }
    const updated = [...contentData.experience, newItem]
    saveContentAndSync({ ...contentData, experience: updated })
    showNotification('Experiência adicionada com sucesso!', 'success')
    return newItem
  }

  const updateExperience = (id, updatedData) => {
    const updated = contentData.experience.map(item => item.id === id ? { ...item, ...updatedData } : item)
    saveContentAndSync({ ...contentData, experience: updated })
    showNotification('Experiência atualizada com sucesso!', 'success')
  }

  const deleteExperience = (id) => {
    const updated = contentData.experience.filter(item => item.id !== id)
    saveContentAndSync({ ...contentData, experience: updated })
    showNotification('Experiência excluída com sucesso!', 'success')
  }

  // ===== CRUD SKILLS =====
  const addSkill = (item) => {
    const newItem = { ...item, id: Date.now().toString(), createdAt: new Date().toISOString() }
    const updated = [...contentData.skills, newItem]
    saveContentAndSync({ ...contentData, skills: updated })
    showNotification('Habilidade adicionada com sucesso!', 'success')
    return newItem
  }

  const updateSkill = (id, updatedData) => {
    const updated = contentData.skills.map(item => item.id === id ? { ...item, ...updatedData } : item)
    saveContentAndSync({ ...contentData, skills: updated })
    showNotification('Habilidade atualizada com sucesso!', 'success')
  }

  const deleteSkill = (id) => {
    const updated = contentData.skills.filter(item => item.id !== id)
    saveContentAndSync({ ...contentData, skills: updated })
    showNotification('Habilidade excluída com sucesso!', 'success')
  }

  // ===== CRUD PUBLICAÇÕES =====
  const addPublication = (item) => {
    const newItem = { ...item, id: Date.now().toString(), createdAt: new Date().toISOString() }
    const updated = [...contentData.publications, newItem]
    saveContentAndSync({ ...contentData, publications: updated })
    showNotification('Publicação adicionada com sucesso!', 'success')
    return newItem
  }

  const updatePublication = (id, updatedData) => {
    const updated = contentData.publications.map(item => item.id === id ? { ...item, ...updatedData } : item)
    saveContentAndSync({ ...contentData, publications: updated })
    showNotification('Publicação atualizada com sucesso!', 'success')
  }

  const deletePublication = (id) => {
    const updated = contentData.publications.filter(item => item.id !== id)
    saveContentAndSync({ ...contentData, publications: updated })
    showNotification('Publicação excluída com sucesso!', 'success')
  }

  // ===== CONTATO =====
  const updateContact = (data) => {
    saveContentAndSync({ ...contentData, contact: data })
    showNotification('Contato atualizado com sucesso!', 'success')
  }

  // ===== ARQUIVOS =====
  const uploadFile = (file, projectId, category) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileData = {
          id: Date.now().toString() + '_' + file.name,
          name: file.name,
          type: file.type,
          size: file.size,
          category: category || 'other',
          data: e.target.result,
          projectId: projectId,
          uploadedAt: new Date().toISOString()
        }
        const currentFiles = uploadedFiles[projectId] || []
        const updated = { ...uploadedFiles, [projectId]: [...currentFiles, fileData] }
        saveFilesAndSync(updated)
        resolve(fileData)
      }
      reader.onerror = () => reject(new Error('Erro ao ler o arquivo'))
      reader.readAsDataURL(file)
    })
  }

  const getProjectFiles = (projectId) => uploadedFiles[projectId] || []

  const deleteFile = (fileId, projectId) => {
    const currentFiles = uploadedFiles[projectId] || []
    const updated = { ...uploadedFiles, [projectId]: currentFiles.filter(f => f.id !== fileId) }
    if (updated[projectId]?.length === 0) delete updated[projectId]
    saveFilesAndSync(updated)
    showNotification('Arquivo excluído com sucesso!', 'success')
  }

  const getContentByType = (type) => {
    switch(type) {
      case 'education': return contentData.education || []
      case 'experience': return contentData.experience || []
      case 'skills': return contentData.skills || []
      case 'publications': return contentData.publications || []
      case 'contact': return contentData.contact || {}
      default: return []
    }
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      isLoading,
      projects,
      uploadedFiles,
      contentData,
      notification,
      showNotification,
      login,
      logout,
      loadAllData,
      getAllProjects,
      addProject,
      updateProject,
      deleteProject,
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
      uploadFile,
      getProjectFiles,
      deleteFile,
      getContentByType,
      ADMIN_USER,
      ADMIN_PASSWORD
    }}>
      {children}
    </AdminContext.Provider>
  )
}