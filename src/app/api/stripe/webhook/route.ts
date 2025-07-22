import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const buf = await req.arrayBuffer();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Parse cart from metadata
    let cart = [];
    try {
      cart = JSON.parse(session.metadata?.cart || '[]');
    } catch {}
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
      subject: 'New Paid Order Received',
      text: `New paid order received:\n\nName: ${session.metadata?.name}\nEmail: ${session.customer_email}\nPhone: ${session.metadata?.phone}\nAddress: ${session.metadata?.address}\n\nItems:\n${items}\n\nTotal: $${(session.amount_total! / 100).toFixed(2)}`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }
  return NextResponse.json({ received: true });
} 