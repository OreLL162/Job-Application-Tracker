import cron from 'node-cron';
import nodemailer from 'nodemailer';
import Job from '../models/Job.js'; 
import User from '../models/User.js'; 
import { jobReminderTemplate } from './emailTemplates.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendJobReminders() {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const jobs = await Job.find({
      reminderDate: { $gte: start, $lte: end }
    }).populate('user');
    console.log('Jobs found for reminder:', jobs);

    for (const job of jobs) {
      if (!job.user || !job.user.email) {
        console.log('No user or email for job:', job);
        continue;
      }

      const { text, html } = jobReminderTemplate({
        username: job.user.username,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        userId: job.user._id,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: job.user.email,
        subject: `Friendly Reminder: Follow Up on Your Application for ${job.jobTitle} at ${job.companyName}`,
        text,
        html,
      });
    }

    if (jobs.length > 0) {
      console.log(`Sent ${jobs.length} job reminder emails.`);
    } else {
      console.log('No job reminders to send today.');
    }
  } catch (err) {
    console.error('Error sending job reminders:', err);
  }
}

sendJobReminders();


// Keep your cron job for production
cron.schedule('0 8 * * *', sendJobReminders);