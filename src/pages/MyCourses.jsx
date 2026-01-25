import { useEffect, useState } from 'react';
import { getUserEnrollments } from '../services/enrollments';
import { useAuth } from '../context/AuthContext';
import { getCourseById } from '../services/firestoreCourses';
import CourseCard from '../components/CourseCard';
import '../styles/MyCourses.css';

function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      if (!user) return;
      const enrollments = await getUserEnrollments(user.uid);
      // Traer detalles y progreso juntos
      const coursePromises = enrollments.map(async (e) => {
        const course = await getCourseById(e.courseId);
        return { ...course, progress: e.progress };
      });
      const courseDetails = await Promise.all(coursePromises);
      setCourses(courseDetails);
    }
    fetchCourses();
  }, [user]);

  if (!user) return <div>Debes iniciar sesión para ver tus cursos.</div>;

  return (
    <div className="my-courses-container">
      <h2>Mis Cursos</h2>
      {courses.length === 0 ? (
        <p>No estás inscrito en ningún curso.</p>
      ) : (
        <div className="courses-list">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} progress={course.progress} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
