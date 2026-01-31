const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");
const logger = require("firebase-functions/logger");

// Definir parámetros
const emailUser = "ernestoalexisvazquez@gmail.com"; // Tu email
const emailPass = defineSecret("EMAIL_PASS"); // App password como secreto

// Configurar el transporter de Nodemailer (usa Gmail)
const createTransporter = (pass) => nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: pass
  }
});

// Función que se activa cuando se crea un documento en mentorshipContacts
exports.sendMentorshipEmail = onDocumentCreated({
  document: "mentorshipContacts/{contactId}",
  secrets: [emailPass]
}, async (event) => {
  const contactData = event.data.data(); // Los datos del documento

  const transporter = createTransporter(emailPass.value());

  const mailOptions = {
    from: emailUser,
    to: emailUser, // Enviar a ti mismo
    subject: 'Nuevo contacto de mentoría',
    html: `
      <h2>Nuevo contacto de mentoría</h2>
      <p><strong>Nombre:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Tema:</strong> ${contactData.topic}</p>
      <p><strong>Mensaje:</strong> ${contactData.message}</p>
      <p><strong>Fecha:</strong> ${contactData.timestamp.toDate()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Email enviado exitosamente');
  } catch (error) {
    logger.error('Error enviando email:', error);
  }
});
