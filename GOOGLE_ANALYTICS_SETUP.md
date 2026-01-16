# Configuración de Google Analytics 4

## Pasos para activar el seguimiento

### 1. Crear propiedad en Google Analytics 4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una cuenta o usa una existente
3. Crea una nueva propiedad
4. Selecciona **GA4** (Google Analytics 4)
5. Copia el **ID de medición** que tiene el formato `G-XXXXXXXXXX`

### 2. Configurar el ID en tu sitio

Abre el archivo `index.html` y reemplaza **ambas** apariciones de `G-XXXXXXXXXX` con tu ID real:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TU_ID_AQUI');
</script>
```

### 3. Reconstruir y deployar

```bash
npm run build
git add .
git commit -m "feat: configurar Google Analytics 4"
git push
```

## Eventos personalizados configurados

El sitio ya registra automáticamente estos eventos:

### 📄 `view_blog_post`
Se dispara cada vez que alguien abre un artículo del blog.

**Parámetros:**
- `article_title`: Título del post
- `article_category`: Categoría del post
- `article_id`: ID numérico del post

### 🔗 `share_article`
Se dispara cuando alguien hace clic en "Compartir en LinkedIn".

**Parámetros:**
- `method`: 'LinkedIn'
- `article_title`: Título del post compartido
- `article_id`: ID del post compartido

## Ver resultados en GA4

1. Ve a tu propiedad en Google Analytics
2. En el menú lateral, selecciona **Informes** → **Eventos**
3. Verás los eventos `view_blog_post` y `share_article` listados con sus métricas

### Para métricas detalladas:
- **Tiempo en página**: GA4 lo mide automáticamente como "engagement_time"
- **Páginas más vistas**: Ve a **Informes** → **Participación** → **Páginas y pantallas**
- **Eventos personalizados**: **Informes** → **Eventos** (ahí verás `view_blog_post` y `share_article`)

## Agregar más eventos personalizados

Ejemplo para rastrear clics en proyectos:

```jsx
// En Projects.jsx
const handleProjectClick = (projectName) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_project', {
      project_name: projectName
    });
  }
};
```

## Notas importantes

- Los datos pueden tardar **24-48 horas** en aparecer por primera vez
- En modo desarrollo, los eventos se registran pero no afectan las estadísticas reales
- Puedes usar la extensión de Chrome "Google Analytics Debugger" para verificar que los eventos se disparan correctamente
