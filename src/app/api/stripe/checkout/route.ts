import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });

export async function POST(req: NextRequest) {
  const { cart, form } = await req.json();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: form.email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=1`,
      metadata: {
        name: form.name,
        phone: form.phone,
        address: `${form.address}, ${form.city}, ${form.zip}`,
        cart: JSON.stringify(cart),
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 