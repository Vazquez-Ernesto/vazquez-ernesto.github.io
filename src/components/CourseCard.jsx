import { Link } from 'react-router-dom';
import '../styles/CourseCard.css';

function CourseCard({ course, progress }) {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div style={{ margin: '12px 0' }}>
        <span><b>Duración:</b> {course.duration}</span>{' '}
        <span><b>Nivel:</b> {course.level}</span>
      </div>
      <div>
        <span><b>Lecciones:</b> {course.lessons}</span>
      </div>
      <div style={{ margin: '16px 0', color: '#ff1a4b', fontWeight: 700, fontSize: 22 }}>
        ${course.price} USD <span style={{ color: '#ffb347', fontWeight: 400, fontSize: 16 }}>o ${course.priceMonthly}/mes</span>
      </div>
      {typeof progress === 'number' && (
        <div style={{ margin: '12px 0' }}>
          <b>Progreso:</b> {progress}%
          <div style={{ background: '#333', borderRadius: 8, height: 8, marginTop: 4 }}>
            <div style={{ width: `${progress}%`, height: 8, background: '#ffb347', borderRadius: 8 }}></div>
          </div>
        </div>
      )}
      <Link to={`/courses/${course.id}`} className="course-card-btn">
        Inscribirse
      </Link>
    </div>
  );
}

export default CourseCard;
