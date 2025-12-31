# 📝 Guía para Agregar Nuevos Posts al Blog

¡Hola! Esta guía te ayudará a agregar nuevos posts de blog de forma súper fácil.

## 🚀 Cómo agregar un nuevo post

### Paso 1: Abrir el archivo de datos

Abre el archivo: `src/data/blogPosts.json`

### Paso 2: Agregar tu nuevo post

Copia y pega esta plantilla al **inicio** del array (después del primer `[`):

```json
{
  "id": 7,
  "title": "Tu título aquí",
  "excerpt": "Un resumen corto de tu post (1-2 líneas)",
  "date": "31 Diciembre 2025",
  "category": "Categoría",
  "readTime": "X min lectura",
  "image": "🚀",
  "content": "<h2>Tu primer subtítulo</h2><p>Tu primer párrafo aquí.</p><h2>Otro subtítulo</h2><p>Otro párrafo.</p>"
},
```

**⚠️ IMPORTANTE:** No olvides la **coma** al final del objeto si no es el último elemento.

### Paso 3: Personalizar tu post

#### Campos básicos:
- **id**: Usa el siguiente número consecutivo (si el último es 6, usa 7)
- **title**: El título principal de tu post
- **excerpt**: Un resumen breve para la lista de posts
- **date**: Fecha en formato "DD Mes AAAA"
- **category**: Categorías sugeridas:
  - `Desarrollo`
  - `Proyectos`
  - `CSS`
  - `JavaScript`
  - `React`
  - `Herramientas`
  - O crea tu propia categoría
- **readTime**: "X min lectura"
- **image**: Un emoji relacionado al tema 🎨 ⚛️ 💻 🔧 📦 🚀 🎯
- **content**: El contenido HTML de tu post (ver siguiente sección)

## 📄 Escribir el contenido

El contenido usa HTML simple. Aquí tienes las etiquetas más comunes:

### Títulos
```html
<h2>Título Principal de Sección</h2>
<h3>Subtítulo</h3>
```

### Párrafos
```html
<p>Tu texto aquí.</p>
```

### Listas
```html
<ul>
  <li>Elemento 1</li>
  <li>Elemento 2</li>
</ul>

<ol>
  <li>Primer paso</li>
  <li>Segundo paso</li>
</ol>
```

### Texto en negrita
```html
<p>Esto es <strong>muy importante</strong>.</p>
```

### Código
```html
<pre><code>const ejemplo = 'código aquí'</code></pre>
```

### Citas de código inline
```html
<p>Usa el comando <code>npm install</code> para instalar.</p>
```

## 📝 Ejemplo completo

```json
{
  "id": 7,
  "title": "Mi experiencia con TypeScript",
  "excerpt": "Descubre cómo TypeScript mejoró la calidad de mi código y por qué deberías probarlo.",
  "date": "1 Enero 2026",
  "category": "JavaScript",
  "readTime": "6 min lectura",
  "image": "📘",
  "content": "<h2>Introducción</h2><p>TypeScript ha cambiado mi forma de programar. En este post comparto mi experiencia.</p><h2>¿Qué es TypeScript?</h2><p>TypeScript es un <strong>superset de JavaScript</strong> que agrega tipos estáticos.</p><h3>Beneficios principales</h3><ul><li>Detecta errores antes de ejecutar</li><li>Mejor autocompletado en el editor</li><li>Código más mantenible</li></ul><h2>Mi primer proyecto</h2><p>Aquí está el código que escribí:</p><pre><code>interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = {\n  name: 'Juan',\n  age: 25\n}</code></pre><h2>Conclusión</h2><p>TypeScript vale totalmente la pena. ¡Pruébalo!</p>"
}
```

## 🔗 Compartir en LinkedIn

Cuando crees un post y lo publiques, los lectores podrán:
1. ✅ Hacer clic en el botón "Compartir en LinkedIn"
2. ✅ Agregar sus propios comentarios al compartir
3. ✅ Su red de LinkedIn podrá comentar y reaccionar

## 💡 Consejos

1. **Escribe el contenido en un editor**: Escribe primero en un editor de texto y luego cópialo al JSON
2. **Escapa las comillas dobles**: Si necesitas usar comillas dentro del content, usa `\"` en lugar de `"`
3. **Saltos de línea en código**: Usa `\n` para nuevas líneas dentro de `<code>`
4. **Emojis**: Los emojis funcionan perfectamente, úsalos para hacer tu contenido más atractivo
5. **Prueba localmente**: Ejecuta `npm run dev` para ver cómo se ve tu post antes de publicar

## 🛠️ Comandos útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🐛 Problemas comunes

### Error al cargar el JSON
- ✅ Verifica que todas las comillas estén correctamente cerradas
- ✅ Asegúrate de que haya comas entre objetos (pero NO después del último)
- ✅ Verifica que los corchetes `[]` estén balanceados

### El post no aparece
- ✅ Verifica que el ID sea único
- ✅ Revisa que el JSON sea válido (usa un validador JSON online)

### El contenido se ve mal
- ✅ Revisa que las etiquetas HTML estén correctamente cerradas
- ✅ Usa las clases CSS existentes para mantener consistencia

## 🎉 ¡Listo!

Ahora ya sabes cómo agregar nuevos posts a tu blog. ¡Diviértete escribiendo! ✍️

---

**¿Preguntas?** Revisa el archivo o contacta al desarrollador.
