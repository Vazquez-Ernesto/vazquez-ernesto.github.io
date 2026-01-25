// Servicio para inscripciones de usuario a cursos
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export async function enrollUser(courseId, userId) {
  try {
    await addDoc(collection(db, 'enrollments'), {
      courseId,
      userId,
      enrolledAt: new Date().toISOString(),
      progress: 0
    });
    return true;
  } catch (error) {
    console.error('Error al inscribir usuario:', error);
    return false;
  }
}

export async function getUserEnrollments(userId) {
  try {
    const q = query(collection(db, 'enrollments'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    return [];
  }
}
