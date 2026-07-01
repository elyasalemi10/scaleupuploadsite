import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY env var is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }
    if (!process.env.SEND_FROM) {
      console.error('SEND_FROM env var is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.SEND_FROM,
      to: ['info@scaleupwithai.ai'], // Contact form recipient
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
              ${String(message).replace(/\n/g, '<br>')}
            </div>
          </div>

        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}
