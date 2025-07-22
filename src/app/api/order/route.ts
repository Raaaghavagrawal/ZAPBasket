import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, phone, address, city, zip, cart, total } = data;

  const items = cart.map((item: any) => `${item.name} x ${item.quantity} ($${item.price})`).join('\n');

  // Send email to admin
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Cash on Delivery Order',
    text: `New cash on delivery order:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}, ${city}, ${zip}\n\nItems:\n${items}\n\nTotal: $${total}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 