export function otpEmailText({ username, otp }) {
  const text = `
Hello ${username},

You have requested to log in to your ApplyFlow account. Please use the One-Time Password (OTP) below to continue:

    🔐 OTP: ${otp}

This code is valid for the next 5 minutes.

If you did not initiate this request, please ignore this email.

Thank you,  
The ApplyFlow Team
  `;

  const html = `
    <div style="background:#f6f8fa;padding:40px 0;">
      <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04);overflow:hidden;">
        <div style="background:#2563eb;padding:32px 24px 24px 24px;">
          <h1 style="color:#fff;font-size:2rem;font-weight:800;margin:0 0 8px 0;font-family:sans-serif;letter-spacing:-1px;">ApplyFlow</h1>
        </div>
        <div style="padding:32px 24px 24px 24px;">
          <h2 style="color:#2563eb;font-size:1.5rem;font-weight:700;margin:0 0 16px 0;font-family:sans-serif;">
            Your One-Time Password (OTP)
          </h2>
          <p style="color:#222;font-size:1rem;margin:0 0 16px 0;font-family:sans-serif;">
            Hello <strong>${username}</strong>,
          </p>
          <div style="text-align:center;margin:32px 0;">
            <span style="display:inline-block;font-size:2.5rem;font-weight:800;letter-spacing:0.2em;color:#2563eb;font-family:sans-serif;">
              ${otp}
            </span>
          </div>
          <p style="color:#222;font-size:1rem;margin:0 0 24px 0;font-family:sans-serif;">
            This code is valid for the next 5 minutes.
          </p>
          <p style="color:black;font-size:1rem;margin:0 0 16px 0;font-family:sans-serif;">
            Thank you,<br>The ApplyFlow Team
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <small style="color:#888;font-size:0.9rem;font-family:sans-serif;">
            This is an automated message. Please do not reply.
          </small>
        </div>
      </div>
      <div style="text-align:center;color:#bbb;font-size:0.85rem;margin-top:24px;font-family:sans-serif;">
        © ${new Date().getFullYear()} ApplyFlow. All rights reserved.
      </div>
    </div>
  `;

  return { text, html };
}
  
  export function jobReminderTemplate({ username, jobTitle, companyName, userId }) {
    const text = `Hello ${username},
  
  I hope you’re doing well.
  
  This is a friendly reminder to check the status of your application for the position of "${jobTitle}" at "${companyName}". Staying on top of your applications ensures you don’t miss any important updates.
  
  Best of luck, and please feel free to reach out if you have any questions.
  
  Sincerely,
  The Applyflow Team`;
  
    const html = `
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
            Hello <strong>${username}</strong>,
          </p>
          <p style="color:#222;font-size:1rem;margin:0 0 24px 0;font-family:sans-serif;">
            This is a friendly reminder to check the status of your application for the position of
            <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="http://localhost:5173/${userId}/dashboard" style="display:inline-block;padding:12px 32px;background:#2563eb;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;font-size:1rem;font-family:sans-serif;box-shadow:0 2px 4px rgba(37,99,235,0.10);">
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
  `;
  
    return { text, html };
  }