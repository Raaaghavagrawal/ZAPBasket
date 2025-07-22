import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      console.error('Missing required fields', { name, email, password });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.error('User already exists:', email);
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error('Signup server error:', error);
    return NextResponse.json({ error: 'Server error', details: (error as Error).message || error }, { status: 500 });
  }
} 