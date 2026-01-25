import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export async function getAllCourses() {
  const coursesCol = collection(db, 'courses')
  const courseSnapshot = await getDocs(coursesCol)
  return courseSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function getCourseById(id) {
  const docRef = doc(db, 'courses', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('No existe el curso');
  }
}