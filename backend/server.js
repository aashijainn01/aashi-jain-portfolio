require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── SQLite setup ──────────────────────────────────────────────────────────────
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// ── Nodemailer / Gmail setup ──────────────────────────────────────────────────
// IMPORTANT: Use a Gmail App Password (NOT your real password).
// Steps to generate one:
//   1. Go to https://myaccount.google.com/security
//   2. Enable 2-Step Verification
//   3. Search "App passwords" → create one for "Mail"
//   4. Paste it in GMAIL_APP_PASSWORD below (or use a .env file)
const GMAIL_USER = process.env.GMAIL_USER || 'jaashi017@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// ── Contact API endpoint ──────────────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // 1. Save to SQLite
  const stmt = db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');
  stmt.run([name, email, subject, message], function (err) {
    if (err) {
      console.error('Error saving to database:', err.message);
      return res.status(500).json({ error: 'Failed to save message.' });
    }

    console.log(`✅ Message #${this.lastID} saved from ${name} <${email}>`);

    // 2. Send email notification to Aashi
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

    transporter.sendMail(mailOptions, (mailErr, info) => {
      if (mailErr) {
        console.error('⚠️  Email send failed (message still saved):', mailErr.message);
      } else {
        console.log('📧 Email notification sent:', info.messageId);
      }
    });

    return res.status(201).json({ success: true, message: 'Message received successfully!', id: this.lastID });
  });
  stmt.finalize();
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🟢 Backend running at http://localhost:${PORT}`);
  console.log(`   POST /api/contact  → saves to SQLite + sends email to ${GMAIL_USER}\n`);
});
