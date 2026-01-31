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
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        setIsSubmitted(true);
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
            <h1>Mentorías para QAs que quieren crecer</h1>
            <p className="hero-description">
              Sesiones 1:1 para conseguir tu primer trabajo, dar el salto a automation o acceder a mejores oportunidades.
            </p>
            <a href="#contact" className="cta-btn">Aplicá ahora</a>
          </section>

          {/* VALUE */}
          <section className="mentorship-intro">
            <h2>¿Por qué una mentoría?</h2>
            <p>
              Menos teoría, más claridad y acción. Te ayudo a definir tu camino y dar los pasos correctos.
            </p>
          </section>

          {/* SERVICES */}
          <section className="mentorship-services">
            <h2>¿En qué te ayudo?</h2>

            <div className="services-grid">
              <div className="service-card">
                <h3>🔰 QA Junior</h3>
                <p>Roadmap, CV, entrevistas y primeros pasos.</p>
              </div>

              <div className="service-card">
                <h3>⚙️ Manual → Automation</h3>
                <p>Qué aprender, cómo practicar y vender tu perfil.</p>
              </div>

              <div className="service-card">
                <h3>🚀 Crecimiento Profesional</h3>
                <p>Análisis de perfil, habilidades clave y estrategia.</p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="mentorship-process">
            <h2>¿Cómo funciona?</h2>
            <ul>
              <li>45–60 min 1:1</li>
              <li>Enfoque personalizado</li>
              <li>Feedback accionable</li>
              <li>Plan concreto al final</li>
            </ul>
          </section>

          {/* CONTACT */}
          <section id="contact" className="mentorship-contact">
            {!isSubmitted ? (
              <>
                <h2>Aplicá ahora</h2>
                <p>Contame tu situación y objetivo. Te respondo con los próximos pasos.</p>

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

                  {submitMessage && !result.success && (
                    <div className="submit-message error">
                      {submitMessage}
                    </div>
                  )}
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="mascota">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="url(#gradient)" stroke="#ff073a" strokeWidth="3" filter="url(#glow)"/>
                    <circle cx="35" cy="40" r="5" fill="white"/>
                    <circle cx="65" cy="40" r="5" fill="white"/>
                    <path d="M40 60 Q50 70 60 60" stroke="white" strokeWidth="3" fill="none"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#ff073a'}}/>
                        <stop offset="100%" style={{stopColor: '#c90202'}}/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                </div>
                <h2>¡Aplicación enviada!</h2>
                <p>{submitMessage}</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </>
  );
}

export default Mentorship;