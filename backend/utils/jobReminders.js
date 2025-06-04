import cron from 'node-cron';
import nodemailer from 'nodemailer';
import Job from '../models/Job.js'; 
import User from '../models/User.js'; 

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
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: job.user.email,
        subject: `Friendly Reminder: Follow Up on Your Application for ${job.jobTitle} at ${job.companyName}`,
        text: `Hello ${job.user.username},

                I hope you’re doing well.

                This is a friendly reminder to check the status of your application for the position of
                "${job.jobTitle}" at "${job.companyName}". Staying on top of your applications ensures you
                don’t miss any important updates.

                Best of luck, and please feel free to reach out if you have any questions.

                Sincerely,
                The Applyflow Team`,
        html: `
          <div style="background:#f6f8fa;padding:40px 0;">
            <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04);overflow:hidden;">
              <div style="background:#2563eb;padding:32px 24px 24px 24px;">
                <h1 style="color:#fff;font-size:2rem;font-weight:800;margin:0 0 8px 0;font-family:sans-serif;letter-spacing:-1px;">ApplyFlow</h1>
              </div>
              <div style="padding:32px 24px 24px 24px;">
                <h2 style="color:#2563eb;font-size:1.5rem;font-weight:700;margin:0 0 16px 0;font-family:sans-serif;">
                  Friendly Reminder: Check Your Application
                </h2>
                <p style="color:#222;font-size:1rem;margin:0 0 16px 0;font-family:sans-serif;">
                  Hello <strong>${job.user.username}</strong>,
                </p>
                <p style="color:#222;font-size:1rem;margin:0 0 24px 0;font-family:sans-serif;">
                  This is a friendly reminder to check the status of your application for the position of
                  <strong>${job.jobTitle}</strong> at <strong>${job.companyName}</strong>.
                </p>
                <div style="text-align:center;margin:32px 0;">
                  <a href="http://localhost:5173/${job.user._id}/dashboard" style="display:inline-block;padding:12px 32px;background:#2563eb;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;font-size:1rem;font-family:sans-serif;box-shadow:0 2px 4px rgba(37,99,235,0.10);">
                    View Your Applications
                  </a>
                </div>
                <p style="color:black;font-size:1rem;margin:0 0 16px 0;font-family:sans-serif;">
                  Best of luck,<br>The Applyflow Team
                </p>
                <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
                <small style="color:#888;font-size:0.9rem;font-family:sans-serif;">
                  This is an automated message. Please do not reply.
                </small>
              </div>
            </div>
            <div style="text-align:center;color:#bbb;font-size:0.85rem;margin-top:24px;font-family:sans-serif;">
              © ${new Date().getFullYear()} Applyflow. All rights reserved.
            </div>
          </div>
        `,
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

sendJobReminders(); //To call the function



// Keep your cron job for production
cron.schedule('0 8 * * *', sendJobReminders);