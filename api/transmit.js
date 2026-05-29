import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

// Define Schema and Model
const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError in Serverless env
const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

export default async function handler(req, res) {
  // Add CORS headers for local development testing if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, details } = req.body;

    if (!name || !email || !details) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 1. Save to Database
    try {
      await connectDB();
      const newLead = new Lead({ name, email, details });
      await newLead.save();
    } catch (dbError) {
      console.error('Database Error:', dbError);
      // We log but continue, so at least we can attempt the email
    }

    // 2. Send Email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'maryadafilms@gmail.com',
        subject: `New Project Inquiry from ${name}`,
        html: `
          <h3>New Project Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Details:</strong><br/> ${details.replace(/\n/g, '<br/>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS not configured. Email not sent.');
    }

    return res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
