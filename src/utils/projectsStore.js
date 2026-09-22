// src/utils/projectsStore.js
// Combina os projetos padrão (src/data/projectsData.js) com as alterações feitas no Admin.
//
// Antes, a lista inteira era copiada para o localStorage na primeira visita, e depois disso
// os visitantes nunca viam projetos novos adicionados ao código. Agora:
//  - projetos padrão aparecem sempre na versão do código, a menos que o Admin os tenha editado
//    (editedAt) ou excluído (lista em portfolio_projects_deleted);
//  - projetos criados no Admin (ids que não existem no código) continuam a aparecer.
import { projectsData } from '../data/projectsData'

export const PROJECTS_KEY = 'portfolio_projects'
export const DELETED_KEY = 'portfolio_projects_deleted'

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

export const getDeletedProjectIds = () => {
  const ids = readJSON(DELETED_KEY, [])
  return Array.isArray(ids) ? ids : []
}

export const markProjectDeleted = (id) => {
  if (!projectsData.some(p => p.id === id)) return
  const ids = new Set(getDeletedProjectIds())
  ids.add(id)
  try { localStorage.setItem(DELETED_KEY, JSON.stringify([...ids])) } catch (e) { /* ignore */ }
}

export const mergeProjects = (saved) => {
  const list = Array.isArray(saved) ? saved : []
  const deleted = new Set(getDeletedProjectIds())
  const savedById = new Map(list.map(p => [p.id, p]))
  const defaultIds = new Set(projectsData.map(p => p.id))

  const defaults = projectsData
    .filter(p => !deleted.has(p.id))
    .map(p => {
      const s = savedById.get(p.id)
      // Só usa a versão guardada se o Admin a editou; mantém notebooks do código se faltarem
      return s && s.editedAt ? { ...p, ...s, notebooks: s.notebooks || p.notebooks } : p
    })

  const custom = list.filter(p => p && !defaultIds.has(p.id))
  return [...defaults, ...custom]
}

export const loadProjects = () => mergeProjects(readJSON(PROJECTS_KEY, []))
