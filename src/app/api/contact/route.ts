// This API route uses environment variables from .env (or .env.local). Restart the server after any changes to .env.
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_OWNER_EMAIL,
      subject: 'New Contact Form Submission',
      html: `<h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>`
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error); // Add this line
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 