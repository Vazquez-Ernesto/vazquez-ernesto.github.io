import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const submitMentorshipContact = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, 'mentorshipContacts'), {
      ...contactData,
      timestamp: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting mentorship contact:', error);
    return { success: false, error: error.message };
  }
};