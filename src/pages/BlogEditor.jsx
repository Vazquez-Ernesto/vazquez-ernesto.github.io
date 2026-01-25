import { useState } from 'react'
import '../styles/BlogEditor.css'

function BlogEditor() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
    category: '',
    readTime: '',
    image: '📝',
    content: ''
  })
  
  const [generatedJSON, setGeneratedJSON] = useState('')
  const [showCopied, setShowCopied] = useState(false)

  // Función para convertir texto plano a HTML
  const convertTextToHTML = (text) => {
    if (!text) return ''
    
    // Dividir el texto en bloques
    const lines = text.split('\n')
    let html = ''
    let inList = false
    let listType = ''
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (!line) {
        // Cerrar lista si hay una abierta
        if (inList) {
          html += `</${listType}>`
          inList = false
        }
        continue
      }
      
      // Detectar títulos con ##
      if (line.startsWith('## ')) {
        if (inList) {
          html += `</${listType}>`
          inList = false
        }
        html += `<h2>${line.substring(3)}</h2>`
      }
      // Detectar subtítulos con ###
      else if (line.startsWith('### ')) {
        if (inList) {
          html += `</${listType}>`
          inList = false
        }
        html += `<h3>${line.substring(4)}</h3>`
      }
      // Detectar listas numeradas
      else if (/^\d+\.\s/.test(line)) {
        if (!inList) {
          html += '<ol>'
          inList = true
          listType = 'ol'
        } else if (listType !== 'ol') {
          html += `</${listType}><ol>`
          listType = 'ol'
        }
        html += `<li>${line.replace(/^\d+\.\s/, '')}</li>`
      }
      // Detectar listas con viñetas
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList) {
          html += '<ul>'
          inList = true
          listType = 'ul'
        } else if (listType !== 'ul') {
          html += `</${listType}><ul>`
          listType = 'ul'
        }
        html += `<li>${line.substring(2)}</li>`
      }
      // Detectar bloques de código (líneas que empiezan con 4 espacios o tab)
      else if (line.startsWith('    ') || line.startsWith('\t')) {
        if (inList) {
          html += `</${listType}>`
          inList = false
        }
        // Buscar el bloque completo de código
        let codeBlock = line.substring(line.startsWith('    ') ? 4 : 1)
        while (i + 1 < lines.length && (lines[i + 1].startsWith('    ') || lines[i + 1].startsWith('\t'))) {
          i++
          codeBlock += '\\n' + lines[i].substring(lines[i].startsWith('    ') ? 4 : 1)
        }
        html += `<pre><code>${codeBlock}</code></pre>`
      }
      // Párrafo normal
      else {
        if (inList) {
          html += `</${listType}>`
          inList = false
        }
        // Procesar negritas **texto** o __texto__
        let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        processedLine = processedLine.replace(/__(.*?)__/g, '<strong>$1</strong>')
        // Procesar código inline `código`
        processedLine = processedLine.replace(/`(.*?)`/g, '<code>$1</code>')
        html += `<p>${processedLine}</p>`
      }
    }
    
    // Cerrar lista si quedó abierta
    if (inList) {
      html += `</${listType}>`
    }
    
    return html
  }

  // Generar el JSON del post
  const generateJSON = () => {
    const htmlContent = convertTextToHTML(formData.content)
    
    const postObject = {
      id: 0, // El usuario debe cambiarlo al siguiente número
      title: formData.title,
      excerpt: formData.excerpt,
      date: formData.date,
      category: formData.category,
      readTime: formData.readTime,
      image: formData.image,
      content: htmlContent
    }
    
    const jsonString = JSON.stringify(postObject, null, 2)
    setGeneratedJSON(jsonString)
  }

  // Copiar al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  // Limpiar formulario
  const clearForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: '',
      readTime: '',
      image: '📝',
      content: ''
    })
    setGeneratedJSON('')
  }

  return (
    <div className="blog-editor">
      <div className="editor-hero section">
        <div className="container">
          <h1 className="fade-in">✍️ Editor de Blog</h1>
          <p className="editor-subtitle">
            Escribe tu post en texto plano y conviértelo a JSON automáticamente
          </p>
        </div>
      </div>

      <section className="editor-content section">
        <div className="container">
          <div className="editor-grid">
            {/* Formulario */}
            <div className="editor-form card">
              <h2>📝 Información del Post</h2>
              
              <div className="form-group">
                <label htmlFor="title">Título *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Mi Increíble Post sobre React"
                />
              </div>

              <div className="form-group">
                <label htmlFor="excerpt">Resumen (excerpt) *</label>
                <textarea
                  id="excerpt"
                  rows="2"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Un breve resumen de 1-2 líneas para la vista de tarjeta"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Fecha</label>
                  <input
                    type="text"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    placeholder="15 Enero 2025"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="readTime">Tiempo de lectura</label>
                  <input
                    type="text"
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    placeholder="5 min lectura"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Desarrollo, React, CSS, etc."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Emoji</label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="🚀 ⚛️ 💻 🎨"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content">Contenido *</label>
                <div className="content-help">
                  <p><strong>Formato de escritura:</strong></p>
                  <ul>
                    <li><code>## Título</code> - Título principal</li>
                    <li><code>### Subtítulo</code> - Subtítulo</li>
                    <li><code>- Item</code> - Lista con viñetas</li>
                    <li><code>1. Item</code> - Lista numerada</li>
                    <li><code>**texto**</code> - Negrita</li>
                    <li><code>`código`</code> - Código inline</li>
                    <li>4 espacios al inicio - Bloque de código</li>
                  </ul>
                </div>
                <textarea
                  id="content"
                  rows="15"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="## Introducción&#10;&#10;Este es mi primer párrafo con **texto en negrita**.&#10;&#10;### Subtítulo&#10;&#10;- Punto 1&#10;- Punto 2&#10;&#10;Otro párrafo aquí."
                />
              </div>

              <div className="form-actions">
                <button onClick={generateJSON} className="btn btn-primary">
                  🔄 Generar JSON
                </button>
                <button onClick={clearForm} className="btn btn-secondary">
                  🗑️ Limpiar
                </button>
              </div>
            </div>

            {/* Vista previa del JSON */}
            <div className="editor-preview card">
              <h2>📋 JSON Generado</h2>
              
              {generatedJSON ? (
                <>
                  <div className="json-output">
                    <pre>{generatedJSON}</pre>
                  </div>
                  
                  <div className="preview-actions">
                    <button onClick={copyToClipboard} className="btn btn-primary">
                      {showCopied ? '✅ ¡Copiado!' : '📋 Copiar JSON'}
                    </button>
                  </div>

                  <div className="instructions">
                    <h3>📌 Cómo usarlo:</h3>
                    <ol>
                      <li>Copia el JSON generado</li>
                      <li>Abre <code>src/data/blogPosts.json</code></li>
                      <li>Pégalo al <strong>inicio</strong> del array (después del <code>[</code>)</li>
                      <li>Cambia el <code>id</code> al siguiente número consecutivo</li>
                      <li>Añade una coma <code>,</code> después del objeto</li>
                      <li>¡Guarda y listo! 🎉</li>
                    </ol>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>👈 Completa el formulario y haz clic en "Generar JSON"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogEditor
