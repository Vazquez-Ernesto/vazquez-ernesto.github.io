import { useState } from 'react'
import '../styles/Projects.css'

function Projects() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 4,
      title: 'Primer Portfolio - QA Automation',
      description: 'Mi primer portfolio web desarrollado para mostrar mi experiencia como QA Engineer. Incluye información personal, skills técnicos y experiencia laboral en QA Manual/Automation.',
      category: 'portfolio',
      technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      image: '🚀',
      link: 'https://vazquez-ernesto.github.io/-Portafolio-QA-Automation/',
      github: '#'
    },
    {
      id: 1,
      title: 'Blog React',
      description: 'Blog personal construido con React y desplegado en GitHub Pages.',
      category: 'portfolio',
      technologies: ['React', 'Vite', 'CSS'],
      image: '📰',
      link: 'https://vazquez-ernesto.github.io/blog-react/',
      github: '#'
    },
    {
      id: 2,
      title: 'Selenium Java Automation',
      description: 'Proyecto de pruebas E2E con Selenium, Java y Cucumber.',
      category: 'automation',
      technologies: ['Selenium', 'Java', 'Cucumber', 'JUnit'],
      image: '🧪',
      link: '#',
      github: 'https://github.com/Vazquez-Ernesto/selenium-java-automation'
    },
    {
      id: 3,
      title: 'Playwright E2E - Swabslabs',
      description: 'Proyecto Playwright con Page Objects, tests e informes HTML.',
      category: 'automation',
      technologies: ['Playwright', 'JavaScript', 'GitHub Actions'],
      image: '🎭',
      link: '#',
      github: 'https://github.com/Vazquez-Ernesto/proyect-swabslabs-playwright'
    }
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)

  return (
    <div className="projects">
      <section className="projects-hero section">
        <div className="container">
          <h1 className="fade-in">Mis Proyectos de QA Automation</h1>
          <p className="projects-subtitle">
            Frameworks de automatización, testing de APIs y soluciones de calidad
          </p>
        </div>
      </section>

      <section className="projects-content section">
        <div className="container">
          <div className="filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              className={`filter-btn ${filter === 'automation' ? 'active' : ''}`}
              onClick={() => setFilter('automation')}
            >
              Automation
            </button>
            <button
              className={`filter-btn ${filter === 'api' ? 'active' : ''}`}
              onClick={() => setFilter('api')}
            >
              API Testing
            </button>
            <button
              className={`filter-btn ${filter === 'devops' ? 'active' : ''}`}
              onClick={() => setFilter('devops')}
            >
              DevOps
            </button>
            <button
              className={`filter-btn ${filter === 'portfolio' ? 'active' : ''}`}
              onClick={() => setFilter('portfolio')}
            >
              Portfolio
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card card fade-in">
                <div className="project-image">
                  <span>{project.image}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.link !== '#' && (
                      <a
                        href={project.link}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Proyecto
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a
                        href={project.github}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                    {project.link === '#' && project.github === '#' && (
                      <span className="project-link" style={{opacity: 0.6, cursor: 'default'}}>
                        Proyecto Privado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No hay proyectos en esta categoría todavía.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projects
