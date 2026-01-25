import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/firestoreCourses';

import CourseCard from '../components/CourseCard';
import '../styles/Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  async function fetchCourses() {
    try {
      const data = await getAllCourses();
      console.log("Cursos traídos de Firestore:", data);
      setCourses(data);
    } catch (err) {
      console.error("Error real al cargar los cursos:", err); // <--- Agrega esto
      setError('Error al cargar los cursos');
    } finally {
      setLoading(false);
    }
  }
  fetchCourses();
}, []);

  if (loading) return <div className="courses-loading">Cargando cursos...</div>;
  if (error) return <div className="courses-error">{error}</div>;

  return (
    <div className="courses-section">
      <h1 className="courses-title">Cursos disponibles</h1>
      {courses.length === 0 ? (
        <p className="courses-empty">No hay cursos disponibles.</p>
      ) : (
        <div className="courses-list">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Courses;