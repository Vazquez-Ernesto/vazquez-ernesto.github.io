# Portfolio 2.0

Portfolio personal y blog construido con React, representando la evolución de mi viaje como desarrollador web.

## Descripción

Este portfolio es una versión mejorada de mi primer blog-portfolio que creé con HTML, CSS y JavaScript hace 2 años cuando di mis primeros pasos en la programación. Hoy, 2 años después, quiero hacer algo más profesional utilizando React y tecnologías modernas.

**El piloto soy yo y yo sé a dónde voy.**

## Características

- **Página de Inicio (Home)**: Presentación con hero section y tecnologías principales
- **Sobre Mí (About)**: Información personal, habilidades técnicas y trayectoria profesional
- **Proyectos (Projects)**: Galería de proyectos con filtros por categoría
- **Blog**: Sección de artículos y publicaciones sobre desarrollo web
- **Diseño Responsivo**: Adaptado a todos los dispositivos
- **Navegación Dinámica**: Usando React Router para SPA fluida
- **Componentes Reutilizables**: Arquitectura modular y escalable

## Tecnologías Utilizadas

- **React** - Librería de JavaScript para interfaces de usuario
- **React Router DOM** - Navegación entre páginas
- **Vite** - Build tool rápido y moderno
- **CSS3** - Estilos con variables CSS y diseño responsivo
- **JavaScript ES6+** - Sintaxis moderna de JavaScript

## Estructura del Proyecto

```
PortFolio2.0/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Header.jsx    # Navegación principal
│   │   ├── Header.css
│   │   ├── Footer.jsx    # Pie de página
│   │   └── Footer.css
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Home.jsx      # Página principal
│   │   ├── Home.css
│   │   ├── About.jsx     # Sobre mí
│   │   ├── About.css
│   │   ├── Projects.jsx  # Galería de proyectos
│   │   ├── Projects.css
│   │   ├── Blog.jsx      # Lista de artículos
│   │   ├── Blog.css
│   │   ├── BlogPost.jsx  # Detalle de artículo
│   │   └── BlogPost.css
│   ├── styles/           # Estilos globales
│   │   └── App.css       # Estilos base y variables
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Punto de entrada
├── index.html            # HTML principal
├── vite.config.js        # Configuración de Vite
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo

```

## Instalación y Uso

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Vazquez-Ernesto/PortFolio2.0.git
cd PortFolio2.0
```

2. Instala las dependencias:
```bash
npm install
```

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## Personalización

Este portfolio está diseñado para ser fácilmente personalizable:

1. **Colores**: Modifica las variables CSS en `src/styles/App.css`
2. **Contenido**: Actualiza los datos en cada página (About, Projects, Blog)
3. **Estilos**: Cada componente tiene su propio archivo CSS
4. **Añadir páginas**: Crea nuevos componentes en `src/pages/` y agrégalos al router en `App.jsx`

## Roadmap

- [ ] Integrar con un CMS para el blog
- [ ] Añadir modo oscuro
- [ ] Implementar animaciones más complejas
- [ ] Añadir formulario de contacto funcional
- [ ] Optimizar imágenes y assets
- [ ] Añadir SEO metatags
- [ ] Deploy en Vercel o Netlify

## Aprendizajes

Este proyecto me ha permitido:
- Profundizar en React y sus conceptos (componentes, hooks, estado)
- Trabajar con React Router para navegación SPA
- Implementar diseño responsivo con CSS moderno
- Estructurar un proyecto React de forma escalable
- Usar Vite como build tool

## Contacto

- GitHub: [Vazquez-Ernesto](https://github.com/Vazquez-Ernesto)
- Portfolio: https://vazquez-ernesto.github.io/

Mantengo este README actualizado con cada nueva iteración del sitio.

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia ISC.

---

**Hecho con React y mucho aprendizaje continuo** 🚀 
