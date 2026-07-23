import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { escapeHtml } from '@/lib/escape-html';

export const runtime = 'nodejs';

/** Renders where the enquiry came from, when the visit was tagged or referred. */
function originBlock(attribution: any): string {
  if (!attribution || typeof attribution !== 'object') return '';

  const field = (value: unknown, fallback = 'Not provided') =>
    typeof value === 'string' && value ? escapeHtml(value.slice(0, 300)) : fallback;

  const rows: Array<[string, string]> = [
    ['Source', field(attribution.source, 'Not tagged')],
    ['Campaign', field(attribution.campaign)],
    ['Referrer', field(attribution.referrer, 'Direct / none')],
    ['First page seen', field(attribution.landingPage, '/')],
  ];

  return `
    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 15px;">Where this lead came from</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 4px 12px 4px 0; color: #6b7280; vertical-align: top; white-space: nowrap;">${label}</td>
            <td style="padding: 4px 0; color: #1f2937; word-break: break-word;">${value}</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>`;
}

export async function POST(req: Request) {
  try {
    const { name, email, company, message, attribution } = await req.json();

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
            <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
            <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
            <p><strong>Company:</strong> ${company ? escapeHtml(String(company)) : 'Not provided'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
              ${escapeHtml(String(message)).replace(/\n/g, '<br>')}
            </div>
          </div>

          ${originBlock(attribution)}

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
