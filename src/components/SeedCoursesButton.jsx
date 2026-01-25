import React from 'react';
import { seedCourses } from '../scripts/seedCourses';

function SeedCoursesButton() {
  const handleSeed = async () => {
    await seedCourses();
  };

  return (
    <div style={{ margin: '2rem', textAlign: 'center' }}>
      <button onClick={handleSeed} style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '8px', background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Cargar cursos de ejemplo
      </button>
    </div>
  );
}

export default SeedCoursesButton;
