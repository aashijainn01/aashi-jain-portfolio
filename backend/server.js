require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Nodemailer / Gmail setup ──────────────────────────────────────────────────
const GMAIL_USER = process.env.GMAIL_USER || 'jaashi017@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend is running 🚀' });
});

// ── Contact API endpoint ──────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: email,
    subject: `📬 New Message from ${name}: ${subject || '(No Subject)'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #7c3aed;">New Portfolio Message 🚀</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;"><strong>From:</strong></td><td>${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Subject:</strong></td><td>${subject || '—'}</td></tr>
        </table>
        <hr style="margin: 16px 0; border-color: #e5e7eb;" />
        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        <hr style="margin: 16px 0; border-color: #e5e7eb;" />
        <p style="font-size: 12px; color: #9ca3af;">Sent via your portfolio contact form • Reply to this email to respond directly to ${name}.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent from ${name} <${email}> — ID: ${info.messageId}`);
    return res.status(201).json({ success: true, message: 'Message received successfully!' });
  } catch (mailErr) {
    console.error('⚠️  Email send failed:', mailErr.message);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🟢 Backend running at http://localhost:${PORT}`);
  console.log(`   POST /api/contact  → sends email to ${GMAIL_USER}\n`);
});
