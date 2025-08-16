import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const port = 3001;

// Initialize Resend
const resend = new Resend('re_fUddbhZR_74Y9puqH3iGWepV4uSMw8ied');

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's default verified domain
      to: ['iscaleupwithai@gmail.com'], // Back to the intended recipient
      replyTo: email, // Set reply-to as the form submitter's email
      subject: `[Scale Up AI] New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Scale Up AI</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Contact Form Submission</p>
          </div>
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding: 20px 0 10px 0; margin: 0;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }

    console.log('Email sent successfully:', data);
    res.json({ success: true, messageId: data.id });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Email server running on http://localhost:${port}`);
  console.log(`📧 Ready to send emails via Resend`);
});
