import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function sendEmail(to, subject, templateFunction, templateParams) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Ensure templateFunction is a valid function
    if (typeof templateFunction !== 'function') {
      throw new TypeError('templateFunction must be a valid function');
    }

    // Generate text and HTML using the provided template function
    const { text, html } = templateFunction(templateParams);

    const mailOptions = {
      from: "ApplyFlow",
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}