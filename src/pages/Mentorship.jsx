import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { submitMentorshipContact } from '../services/mentorship';
import '../styles/Mentorship.css';

function Mentorship() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await submitMentorshipContact(formData);

      if (result.success) {
        setSubmitMessage(
          '¡Gracias por aplicar a la mentoría! Te voy a responder a la brevedad con los próximos pasos.'
        );
        setFormData({ name: '', email: '', topic: '', message: '' });
      } else {
        setSubmitMessage(
          'Ocurrió un error al enviar el mensaje. Por favor, intentá nuevamente.'
        );
      }
    } catch (error) {
      setSubmitMessage(
        'No se pudo enviar el mensaje en este momento. Intentá más tarde.'
      );
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Mentorías QA - Ernesto Vázquez</title>
        <meta
          name="description"
          content="Mentorías 1:1 para QAs junior, manuales y en crecimiento. Te ayudo a conseguir trabajo, pasar a automation o acceder a mejores oportunidades."
        />
      </Helmet>

      <div className="mentorship-page">
        <div className="container">

          {/* HERO */}
          <section className="mentorship-hero">
            <h1>Mentorías para QAs que quieren crecer profesionalmente</h1>
            <p className="hero-description">
              Te ayudo a avanzar al siguiente nivel como QA: conseguir tu primer trabajo,
              dar el salto a automation o acceder a mejores oportunidades laborales.
            </p>
            <p className="hero-description">
              Mentorías 1:1, prácticas y enfocadas en resultados reales.
            </p>
          </section>

          {/* VALUE */}
          <section className="mentorship-intro">
            <p>
              Trabajo con QAs que están empezando, con perfiles manuales que quieren
              automatizar y con profesionales que buscan crecer o cambiar a un mejor puesto.
            </p>
            <p>
              El enfoque es simple: menos teoría, más claridad y acción concreta.
            </p>
          </section>

          {/* SERVICES */}
          <section className="mentorship-services">
            <h2>¿En qué te puedo ayudar?</h2>

            <div className="services-grid">
              <div className="service-card">
                <h3>🔰 QA Junior / Trainee</h3>
                <p>
                  Si estás empezando y no sabés qué estudiar, cómo armar tu CV
                  o cómo prepararte para entrevistas.
                </p>
                <ul>
                  <li>Roadmap de aprendizaje realista</li>
                  <li>Revisión de CV y LinkedIn</li>
                  <li>Preparación para entrevistas QA</li>
                  <li>Próximos pasos claros</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>⚙️ QA Manual → Automation</h3>
                <p>
                  Si tenés experiencia manual pero no sabés cómo dar el salto a automation.
                </p>
                <ul>
                  <li>Qué aprender y qué no</li>
                  <li>Cómo practicar automation de forma efectiva</li>
                  <li>Cómo vender tu perfil como QA Automation</li>
                  <li>Expectativas reales del mercado</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>🚀 Crecimiento Profesional</h3>
                <p>
                  Si sentís que estás estancado o querés acceder a mejores oportunidades.
                </p>
                <ul>
                  <li>Análisis de tu perfil actual</li>
                  <li>Habilidades clave para crecer</li>
                  <li>Estrategia para entrevistas</li>
                  <li>Plan de acción profesional</li>
                </ul>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="mentorship-process">
            <h2>¿Cómo funciona la mentoría?</h2>
            <ul>
              <li>Sesión 1:1 de 45–60 minutos</li>
              <li>Enfoque personalizado según tu situación</li>
              <li>Feedback honesto y accionable</li>
              <li>Plan de acción concreto al finalizar</li>
            </ul>
            <p>
              No es una charla genérica. Es una sesión pensada para que te vayas
              sabiendo exactamente qué hacer después.
            </p>
          </section>

          {/* CONTACT */}
          <section className="mentorship-contact">
            <h2>Aplicá a una mentoría</h2>
            <p>
              Contame en qué punto estás hoy como QA y qué objetivo querés lograr.
              Te voy a responder con los próximos pasos.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="topic">Tu situación actual</label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="junior">QA Junior / Trainee</option>
                  <option value="manual-to-auto">QA Manual → Automation</option>
                  <option value="growth">Crecimiento / Cambio laboral</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Contame tu experiencia actual como QA y qué objetivo querés lograr en los próximos meses."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar aplicación'}
              </button>

              {submitMessage && (
                <div
                  className={`submit-message ${
                    submitMessage.toLowerCase().includes('error') ? 'error' : 'success'
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </section>

        </div>
      </div>
    </>
  );
}

export default Mentorship;