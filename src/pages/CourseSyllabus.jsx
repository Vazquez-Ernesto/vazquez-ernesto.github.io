import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseById } from '../services/firestoreCourses';
import '../styles/CourseSyllabus.css';

function CourseSyllabus() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourseById(courseId);
      setCourse(data);
      setLoading(false);
    }
    fetchCourse();
  }, [courseId]);

  if (loading) return <div>Cargando temario...</div>;
  if (!course) return <div>Curso no encontrado</div>;

  return (
    <div className="syllabus-container">
      <h1>{course.title} - Temario</h1>
      <div className="syllabus-video">
        <iframe
          width="100%"
          height="360"
          src="https://www.youtube.com/embed/3Kq1MIfTWCE"
          title="Bienvenida"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h2>Contenido del curso</h2>
      <ul>
        {course.modules?.map((mod, i) => (
          <li key={i}>
            <strong>{mod.name}</strong>
            <ul>
              {mod.lessons.map((l, j) => (
                <li key={j}>{l.title} {l.free ? '🔓' : ''}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="syllabus-info">
        <h3>Sobre este curso</h3>
        <p>{course.description}</p>
        {/* Aquí puedes agregar más información exclusiva */}
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/dashboard" className="syllabus-back">Ir a mi Dashboard</Link>
        <Link to="/courses" className="syllabus-back">Volver al catálogo</Link>
      </div>
    </div>
  );
}

export default CourseSyllabus;
