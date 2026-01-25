import { useEffect, useState } from 'react';
import { getUserEnrollments } from '../services/enrollments';
import { getCourseById } from '../services/firestoreCourses';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const userEnrollments = await getUserEnrollments(user.uid);
      setEnrollments(userEnrollments);
      // Obtener los datos de cada curso inscrito, ignorando los que no existen
      const coursePromises = userEnrollments.map(e =>
        getCourseById(e.courseId).catch(() => null)
      );
      const courseData = (await Promise.all(coursePromises)).filter(Boolean);
      setCourses(courseData);
      setLoading(false);
    }
    fetchData();
  }, [user]);

  if (!user) return <div>Debes iniciar sesión para ver tu dashboard.</div>;
  if (loading) return <div>Cargando tu dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Mi Dashboard</h1>
      <section>
        <h2>Mis Cursos</h2>
        {courses.length === 0 ? (
          <p>No estás inscrito en ningún curso.</p>
        ) : (
          <ul className="dashboard-courses-list">
            {courses.map((course, i) => (
              <li key={course.id} className="dashboard-course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <Link to={`/course-syllabus/${course.id}`}>Ir al temario</Link>
                <div className="dashboard-progress">
                  <strong>Progreso:</strong> {
                    enrollments[i]?.progress !== undefined
                      ? `${enrollments[i].progress}%`
                      : '0%'
                  }
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
