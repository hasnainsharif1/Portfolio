import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.resolve(process.cwd(), 'messages.json');

app.use(cors());
app.use(express.json());

// --- DATA ---
const PROJECTS = [
  {
    id: 'p1',
    title: 'FYP - Skill Exchange Platform',
    shortDescription: 'A university platform for peer-to-peer skill sharing.',
    fullDescription: 'The Skill Exchange Platform addresses the need for collaborative learning within university campuses. It allows students to list skills they can teach (e.g., Guitar, Coding) and skills they want to learn. The system uses a credit-based economy where teaching earns credits used to book sessions.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
    imageUrl: 'https://picsum.photos/seed/fyp/800/600',
    repoLink: 'https://github.com/devolution/skill-exchange',
    role: 'Lead Full-Stack Developer',
    features: [
      'Real-time chat using Socket.io',
      'Credit transaction system',
      'Advanced search & filtering',
      'User rating and review system'
    ]
  },
  {
    id: 'p2',
    title: 'Retrog',
    shortDescription: 'A developer productivity tool for retro-style coding environments.',
    fullDescription: 'Retrog is a passion project aimed at developers who love the aesthetic of the 80s but need modern tooling. It is a web-based IDE theme generator and asset manager that applies CRT effects and neon palettes to code snippets for sharing on social media.',
    technologies: ['Vue.js', 'Firebase', 'WebGL', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/retrog/800/600',
    demoLink: 'https://retrog.app',
    role: 'Solo Developer',
    features: [
      'Real-time WebGL CRT shader effects',
      'Syntax highlighting for 20+ languages',
      'Export to PNG/SVG',
      'Cloud storage for themes'
    ]
  },
  {
    id: 'p3',
    title: 'AutoCMS Migration Tool',
    shortDescription: 'Automated script to convert static HTML sites to WordPress.',
    fullDescription: 'A Python-based CLI tool designed to parse static HTML structures and automatically generate WordPress PHP templates and import content into the database. Drastically reduced migration time for client projects.',
    technologies: ['Python', 'BeautifulSoup', 'MySQL', 'WordPress API'],
    imageUrl: 'https://picsum.photos/seed/cms/800/600',
    role: 'Backend Engineer',
    features: [
      'HTML DOM parsing',
      'Automatic post type generation',
      'Image asset optimization and upload',
      'CLI Interface'
    ]
  },
  {
    id: 'p4',
    title: 'AI Customer Support Bot',
    shortDescription: 'Context-aware chatbot for e-commerce stores.',
    fullDescription: 'Integrated a fine-tuned Gemini model into a Laravel e-commerce backend to handle Level 1 support queries regarding order status, returns, and product availability.',
    technologies: ['Laravel', 'Python', 'Gemini API', 'Redis'],
    imageUrl: 'https://picsum.photos/seed/aibot/800/600',
    role: 'AI Integration Specialist',
    features: [
      'Order database lookup integration',
      'Sentiment analysis',
      'Seamless hand-off to human agents',
      'Multi-language support'
    ]
  }
];

// --- HELPER FUNCTIONS ---

// Helper to save message to JSON file
async function saveMessageToJSON(data) {
  try {
    let messages = [];
    
    // Try to read existing file
    try {
      const fileContent = await fs.readFile(DB_FILE, 'utf-8');
      messages = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      messages = [];
    }

    const newMessage = {
      id: Date.now().toString(),
      receivedAt: new Date().toISOString(),
      ...data
    };

    messages.push(newMessage);

    // Write back to file
    await fs.writeFile(DB_FILE, JSON.stringify(messages, null, 2));
    console.log('Message saved to messages.json');
    return true;
  } catch (err) {
    console.error('Error saving to JSON:', err);
    return false;
  }
}

// --- ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Devolution Backend is running' });
});

// Get Projects
app.get('/api/projects', (req, res) => {
  res.json(PROJECTS);
});

// Contact Form Handler
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 1. Save to JSON File
  await saveMessageToJSON({ name, email, subject, message });

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
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (must be authenticated user for Gmail usually)
      replyTo: email, // The user's email
      to: 'hasnainsharif713@gmail.com', // YOUR EMAIL HERE
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      text: `You received a new message from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Subject: ${subject || 'No Subject'}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You can reply directly to this email to respond to ${name}.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a90e2; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border-left: 4px solid #4a90e2; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            You can reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully to hasnainsharif713@gmail.com');
      console.log(`   From: ${name} <${email}>`);
      return res.json({ success: true, message: 'Message saved and email sent!' });
    } catch (error) {
      console.error('❌ Email error:', error.message);
      console.error('   Full error:', error);
      // Even if email fails, we saved it to JSON, so we return success with a warning note
      return res.status(200).json({ 
        success: true, 
        message: 'Message saved (Email delivery failed, check server logs)' 
      });
    }
  } else {
    // Development mode / No credentials
    console.log('\n⚠️  --- MOCK EMAIL SEND (No credentials configured) ---');
    console.log(`   To: hasnainsharif713@gmail.com`);
    console.log(`   From: ${name} <${email}>`);
    console.log(`   Subject: ${subject || 'No Subject'}`);
    console.log(`   Message: ${message}`);
    console.log('   ✅ Saved to messages.json');
    console.log('   📝 To enable email sending, create a .env file with EMAIL_USER and EMAIL_PASS\n');
    
    return res.json({ success: true, message: 'Message saved locally (Mock Mode - configure email to receive emails)' });
  }
});

// Check email configuration on startup
const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 Devolution Backend Server');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📍 Server: http://localhost:${PORT}`);
console.log(`💾 Messages saved to: ${DB_FILE}`);
console.log(`📧 Email Status: ${emailConfigured ? '✅ CONFIGURED' : '❌ NOT CONFIGURED (Mock Mode)'}`);
if (!emailConfigured) {
  console.log('\n⚠️  Email credentials missing!');
  console.log('   To enable email sending:');
  console.log('   1. Open .env file');
  console.log('   2. Add EMAIL_USER and EMAIL_PASS');
  console.log('   3. Restart server');
  console.log('   See QUICK_SETUP.md for details');
}
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error(`Please either:`);
    console.error(`  1. Stop the process using port ${PORT}`);
    console.error(`  2. Or set a different PORT in your .env file\n`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});