import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import emailjs from '@emailjs/browser';

export const submitMentorshipContact = async (contactData) => {
  console.log('Intentando enviar contacto de mentoría:', contactData);
  try {
    // Guardar en Firestore
    const docRef = await addDoc(collection(db, 'mentorshipContacts'), {
      ...contactData,
      timestamp: new Date(),
    });
    console.log('Contacto guardado en Firestore, ID:', docRef.id);

    // Enviar email usando EmailJS
    const emailParams = {
      name: contactData.name,  // Cambiar a 'name' para coincidir con el template
      email: contactData.email,  // Cambiar a 'email'
      topic: contactData.topic,
      message: contactData.message,
      time: new Date().toLocaleString(),  // Agregar time si el template lo usa
    };

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      emailParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    console.log('Email enviado exitosamente');

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al enviar contacto de mentoría:', error);
    return { success: false, error: error.message };
  }
};