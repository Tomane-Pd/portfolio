// src/utils/notebookFormat.js
// Ferramentas leves (sem dependências) para mostrar notebooks Jupyter no site:
//  - highlightPython: realce de sintaxe Python -> HTML
//  - renderMarkdown: Markdown simples (títulos, listas, negrito, código, links) + HTML embutido

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class',
  'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global',
  'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise',
  'return', 'try', 'while', 'with', 'yield'
])

const BUILTINS = new Set([
  'print', 'len', 'range', 'list', 'dict', 'set', 'tuple', 'str', 'int', 'float', 'bool',
  'open', 'input', 'zip', 'map', 'filter', 'sum', 'min', 'max', 'abs', 'round', 'sorted',
  'enumerate', 'isinstance', 'type', 'super', 'self', 'Exception', 'FileNotFoundError'
])

// Ordem importa: comentários e strings primeiro para não realçar palavras dentro deles
const TOKEN = new RegExp(
  [
    '(#[^\\n]*)', // 1 comentário
    '((?:[rRbBuUfF]{0,2})(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'))', // 2 string
    '(^[ \\t]*[!%][^\\n]*)', // 3 comando de shell / magic (!pip, %matplotlib)
    '(@[\\w.]+)', // 4 decorador
    '(\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)', // 5 número
    '([A-Za-z_]\\w*)' // 6 identificador
  ].join('|'),
  'gm'
)

export const highlightPython = (code) => {
  let out = ''
  let last = 0
  let prevWord = ''
  code.replace(TOKEN, (match, comment, string, shell, deco, number, ident, offset) => {
    out += escapeHtml(code.slice(last, offset))
    last = offset + match.length
    const esc = escapeHtml(match)
    if (comment) out += `<span class="tok-comment">${esc}</span>`
    else if (string) out += `<span class="tok-string">${esc}</span>`
    else if (shell) out += `<span class="tok-shell">${esc}</span>`
    else if (deco) out += `<span class="tok-deco">${esc}</span>`
    else if (number) out += `<span class="tok-number">${esc}</span>`
    else if (ident) {
      if (KEYWORDS.has(ident)) out += `<span class="tok-keyword">${esc}</span>`
      else if (prevWord === 'def' || prevWord === 'class') out += `<span class="tok-func">${esc}</span>`
      else if (BUILTINS.has(ident)) out += `<span class="tok-builtin">${esc}</span>`
      else if (code[offset + match.length] === '(') out += `<span class="tok-call">${esc}</span>`
      else out += esc
      prevWord = ident
      return match
    } else out += esc
    prevWord = ''
    return match
  })
  out += escapeHtml(code.slice(last))
  return out
}

// ---------- Markdown ----------
const inline = (text) =>
  text
    .replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

export const renderMarkdown = (source) => {
  const lines = source.split('\n')
  const html = []
  let para = []
  let list = null // { tag: 'ul' | 'ol', start, items: [] }
  const BLOCK_HTML = /^<\/?(h[1-6]|p|div|hr|table|thead|tbody|tr|td|th|ul|ol|li|img|center|section|br|blockquote|pre)\b/i

  const flushPara = () => {
    if (para.length) html.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const flushList = () => {
    if (list) {
      const start = list.tag === 'ol' && list.start > 1 ? ` start="${list.start}"` : ''
      html.push(`<${list.tag}${start}>${list.items.map(i => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`)
    }
    list = null
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    const trimmed = line.trim()
    let m
    if (!trimmed) { flushPara(); flushList(); continue }
    if (BLOCK_HTML.test(trimmed)) { // bloco HTML embutido no notebook: passa tal como está
      flushPara(); flushList(); html.push(line); continue
    }
    if ((m = trimmed.match(/^(#{1,6})\s+(.*)$/))) {
      flushPara(); flushList()
      const level = Math.min(m[1].length + 1, 6) // h1 da página já existe
      html.push(`<h${level}>${inline(m[2])}</h${level}>`)
      continue
    }
    if ((m = trimmed.match(/^(\d+)\.\s*(.*)$/)) || (m = trimmed.match(/^([-*])\s+(.*)$/))) {
      flushPara()
      const tag = /\d/.test(m[1]) ? 'ol' : 'ul'
      if (!list || list.tag !== tag) { flushList(); list = { tag, start: parseInt(m[1], 10) || 1, items: [] } }
      list.items.push(m[2])
      continue
    }
    if (/^---+$/.test(trimmed)) { flushPara(); flushList(); html.push('<hr/>'); continue }
    flushList()
    para.push(trimmed)
  }
  flushPara(); flushList()
  return html.join('\n')
}
