import { Link } from 'react-router-dom'
import '../styles/home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Hola, soy <span className="highlight">Ernesto Vázquez</span>
            </h1>
            <p className="hero-subtitle">
              QA Automation Engineer | Cypress, Selenium, Playwright y Pruebas E2E
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn">
                Ver Proyectos
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Conoce más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section section">
        <div className="container">
          <h2 className="section-title">Especialidades</h2>
          <div className="skills-grid">
            <div className="skill-card card">
              <div className="skill-icon">🤖</div>
              <h3>Automatización de Pruebas</h3>
              <p>Cypress, Selenium, Playwright - Pruebas E2E y regresión automatizadas</p>
            </div>
            <div className="skill-card card">
              <div className="skill-icon">🔧</div>
              <h3>Testing de APIs</h3>
              <p>Postman, Bruno, JMeter, Swagger - Validación de servicios REST</p>
            </div>
            <div className="skill-card card">
              <div className="skill-icon">📊</div>
              <h3>QA & Metodologías Ágiles</h3>
              <p>Scrum, Jira, Confluence, X-Ray, Zephyr - Gestión de calidad</p>
            </div>
            <div className="skill-card card">
              <div className="skill-icon">🚀</div>
              <h3>CI/CD & DevOps</h3>
              <p>Git/GitHub/GitLab, Jenkins, OCP/Grafana - Integración continua</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content card">
            <h2>¿Buscas mejorar la calidad de tu producto?</h2>
            <p>Más de 4 años asegurando la calidad en banca, fintech, telecomunicaciones y entornos ágiles</p>
            <Link to="/about" className="btn">
              Contáctame
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
