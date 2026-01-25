import '../styles/about.css'
import profileImage from '/assets/images/PerfilAbout.png'

function About() {
  const skills = [
    'Cypress', 'Selenium', 'Playwright', 'JavaScript', 'Python', 'TypeScript',
    'Java', 'Postman', 'Bruno', 'JMeter', 'SQL', 'Git/GitHub/GitLab',
    'Jira', 'Confluence', 'X-Ray', 'Zephyr', 'Jenkins', 'CI/CD',
    'Scrum', 'Agile', 'API Testing', 'E2E Testing', 'Swagger', 'OCP/Grafana'
  ]

  return (
    <div className="about">
      <section className="about-hero section">
        <div className="container">
        <h1>Sobre Mí</h1>
          <div className="about-intro">
            <div className="about-image">
              <div className="image-container">
                <img 
                    src={profileImage}
                  alt="Ernesto Vázquez - QA Automation Engineer"
                  className="profile-image"
                />
              </div>
            </div>
            <div className="about-text">
              <h2>Ernesto Alexis Vázquez</h2>
              <h3 style={{color: 'var(--primary-color)', marginBottom: 'var(--spacing-md)'}}>
                QA Automation Engineer | Buenos Aires, Argentina
              </h3>
              <p>
               Después de 4 años asegurando la calidad de productos para la banca y fintech, entendí algo clave: <b>no quiero solo probar software, quiero crearlo. </b>
               Por eso estoy dando el siguiente paso: <b>convertir toda mi experiencia en automatización, análisis y optimización en el motor de mi propia empresa tecnológica.</b> <br />
              </p>
              <p>
               Realice pruebas exploratorias, smoke, regresión y E2E, utilizando herramientas como Cypress, Selenium y Playwright.
              </p>
              <p>
               Mi experiencia incluye metodologías ágiles (Scrum), gestión de proyectos con Jira y X-Ray, y automatización de pipelines CI/CD con Jenkins.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-detail section">
        <div className="container">
          <h2>Habilidades Técnicas</h2>
          <div className="skills-tags">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section section">
        <div className="container">
          <h2>Experiencia Profesional</h2>
          <div className="experience-grid">
            <div className="experience-card">
              <div className="experience-header">
                <h3>QA Automation Engineer</h3>
                <span className="company">Telecom Argentina (Contratado por CFOTech)</span>
                <span className="period">Jun. 2025 - Presente</span>
              </div>
              <p>
                Responsable de asegurar la calidad funcional de una aplicación core para tasación y mediación, 
                dentro del ecosistema de Telecom Argentina. Desarrollo y ejecución de pruebas automatizadas 
                para garantizar la estabilidad y rendimiento de sistemas críticos de telecomunicaciones.
              </p>
            </div>

            <div className="experience-card">
              <div className="experience-header">
                <h3>QA SSR AUTOMATION</h3>
                <span className="company">Getnet</span>
                <span className="period">Ene. 2025 - Jun. 2025</span>
              </div>
              <p>
                Trabajé en el área de QA en Getnet, realizando principalmente pruebas de aceptación de usuario para el agrupador de pagos.
                Me encargué de la certificación de calidad de todos los nuevos productos que el agrupador necesitó en producción.
              </p>
            </div>

            <div className="experience-card">
              <div className="experience-header">
                <h3>QA Manual/Automation</h3>
                <span className="company">Nave Negocios</span>
                <span className="period">Dic. 2022 - Dic. 2024</span>
              </div>
              <p>
                Trabajé como QA en la plataforma Nave, asegurando la calidad de aplicaciones web y sitios de mercado.
                Participé activamente en metodologías ágiles SCRUM, diseñando y ejecutando casos de prueba.
              </p>
            </div>

            <div className="experience-card">
              <div className="experience-header">
                <h3>Analista de Calidad</h3>
                <span className="company">UPEX</span>
                <span className="period">Jun. 2021 - Ene. 2022</span>
              </div>
              <p>
                Fui moderador de la Academia Upex, impartiendo inducción a nuevos miembros y realizando pruebas exploratorias,
                smoke y regresión utilizando X-ray y gestionando en Jira.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About