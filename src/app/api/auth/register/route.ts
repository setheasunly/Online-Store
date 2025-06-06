import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utils/jwt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log('Starting registration process...');
    const body = await request.json();
    const { email, password, name, role = 'USER' } = body;
    console.log('Received registration data:', { email, name, role });

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create user
    console.log('Attempting to create user in database...');
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role === 'ADMIN' ? 'ADMIN' : 'USER',
      },
    });
    console.log('User created successfully:', { id: user.id, email: user.email });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 