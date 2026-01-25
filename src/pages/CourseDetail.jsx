import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '../services/firestoreCourses';
import { enrollUser, getUserEnrollments } from '../services/enrollments';
import { useAuth } from '../context/AuthContext';
import '../styles/CourseDetail.css';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const modules = course?.modules || [];

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  // Detectar si el usuario ya está inscrito en este curso
  useEffect(() => {
    async function checkEnrollment() {
      if (!user) return;
      const enrollments = await getUserEnrollments(user.uid);
      const found = enrollments.some(e => e.courseId === id);
      setEnrolled(found);
    }
    checkEnrollment();
  }, [user, id]);

  const handleEnroll = async () => {
    if (!user) {
      setError('Debes iniciar sesión para inscribirte.');
      return;
    }
    setEnrolling(true);
    setError('');
    const ok = await enrollUser(id, user.uid);
    setEnrolling(false);
    if (ok) {
      setEnrolled(true);
      navigate(`/course-syllabus/${id}`);
    } else {
      setError('No se pudo completar la inscripción.');
    }
  };

  if (loading) return <div className="courses-loading">Cargando curso...</div>;
  if (!course) return <div className="courses-error">Curso no encontrado</div>;

  return (
    <div className="course-detail-container" style={{ display: 'flex', gap: 40, alignItems: 'flex-start', margin: '40px auto', maxWidth: 1200 }}>
      {/* Columna izquierda */}
      <div style={{ flex: 3 }}>
        <Link to="/courses" className="back-link">← Volver al catálogo</Link>
        <h1 style={{ margin: '16px 0 8px 0' }}>{course?.title}</h1>
        <span className="badge" style={{ background: '#b10f2e', color: '#fff', borderRadius: 8, padding: '2px 12px', fontSize: 14, marginRight: 8 }}>{course?.level}</span>
        <span style={{ color: '#ffb347', fontWeight: 600 }}>{course?.duration} · {course?.lessons} lecciones</span>
        <div style={{ margin: '24px 0' }}>
          {/* Video preview simulado */}
          <div style={{ background: '#222', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            <iframe
              width="100%"
              height="320"
              src="https://www.youtube.com/embed/3Kq1MIfTWCE"
              title="Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p style={{ color: '#e0e0e0', fontSize: 18 }}>{course?.description}</p>
        </div>
        <h3>Contenido del curso</h3>
        <div style={{ marginBottom: 24 }}>
          {modules.map((mod, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{mod.name}</strong>
              <ul>
                {mod.lessons.map((l, j) => {
                  const isUnlocked = l.free || enrolled;
                  return (
                    <li
                      key={j}
                      style={{
                        color: isUnlocked ? (l.free ? '#ffb347' : '#e0e0e0') : '#888',
                        opacity: isUnlocked ? 1 : 0.5,
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        listStyle: 'none',
                        marginBottom: 6,
                        padding: '4px 0',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {isUnlocked ? (
                        <span>{l.title} {l.free ? '🔓' : ''}</span>
                      ) : (
                        <span>{l.title} <span style={{marginLeft: 4}}>🔒</span></span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <h4>¿Qué aprenderás?</h4>
          <ul>
            <li>Fundamentos de Selenium</li>
            <li>Patrones de diseño (POM)</li>
            <li>CI/CD con GitHub Actions</li>
            <li>Testing en múltiples browsers</li>
          </ul>
        </div>
      </div>
      {/* Columna derecha: Pricing y acciones */}
      <div style={{
        flex: 2,
        background: 'rgba(20,20,30,0.7)',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 8px 32px 0 rgba(177, 15, 46, 0.18)'
      }}>
        <h2 style={{ color: '#ff1a4b', marginBottom: 16 }}>${course?.price} USD</h2>
        <div style={{ color: '#ffb347', marginBottom: 16 }}>o ${course?.priceMonthly}/mes</div>
        {enrolled ? (
          <Link
            to="/dashboard"
            className="course-enroll-btn"
            style={{ width: '100%', marginBottom: 16, textAlign: 'center', display: 'block' }}
          >
            Ya estás inscrito ✔️ Ir a mi Dashboard
          </Link>
        ) : (
          <button
            className="course-enroll-btn"
            style={{ width: '100%', marginBottom: 16 }}
            onClick={handleEnroll}
            disabled={enrolling}
          >
            {enrolling ? 'Inscribiendo...' : 'Suscribirme'}
          </button>
        )}
        {!course?.isFree && (
          <button className="course-enroll-btn" style={{ width: '100%', background: '#b10f2e', color: '#fff' }}>Comprar curso</button>
        )}
        {error && <div style={{ color: '#ff1a4b', marginTop: 12 }}>{error}</div>}
        <div style={{ marginTop: 32 }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>Certificado incluido</span> 🏆
        </div>
        <div style={{ marginTop: 32 }}>
          <span style={{ color: '#fff' }}>¿Dudas? <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffb347' }}>Únete a la comunidad</a></span>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;