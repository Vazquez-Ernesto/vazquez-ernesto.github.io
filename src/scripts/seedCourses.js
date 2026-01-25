// Script para cargar cursos de ejemplo en Firestore desde el frontend
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function seedCourses() {
  // Curso gratuito
  const freeCourse = {
    title: 'Curso Gratuito de Prueba',
    description: 'Este es un curso de ejemplo para probar el flujo free.',
    isFree: true,
    modules: [
      {
        name: 'Módulo 1',
        lessons: [
          { title: 'Lección 1', free: true },
          { title: 'Lección 2', free: true }
        ]
      }
    ]
  };

  // Curso pago
  const paidCourse = {
    title: 'Curso de QA',
    description: 'Aprende los fundamentos del testing de software desde cero.',
    isFree: false,
    price: 49.99,
    category: 'QA',
    certificado: true,
    duration: '8h',
    image: '🎓',
    lessons: 20,
    level: 'Beginner',
    modules: [
      {
        name: 'Introducción',
        lessons: [
          { title: '¿Qué es QA?', free: true },
          { title: 'Tipos de testing', free: false }
        ]
      }
    ]
  };

  try {
    await addDoc(collection(db, 'courses'), freeCourse);
    await addDoc(collection(db, 'courses'), paidCourse);
    alert('Cursos cargados correctamente');
  } catch (error) {
    alert('Error al cargar cursos: ' + error.message);
  }
}
