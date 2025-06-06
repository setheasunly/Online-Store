import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { verifyToken, getTokenFromHeader } from '@/utils/jwt';

const prisma = new PrismaClient();

// Get cart
export async function GET(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = getTokenFromHeader(authHeader);
    const decoded = verifyToken(token);

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId: decoded.userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: decoded.userId
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add/Update cart item
export async function POST(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = getTokenFromHeader(authHeader);
    const decoded = verifyToken(token);

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || typeof quantity !== 'number' || quantity < 0) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId: decoded.userId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: decoded.userId
        }
      });
    }

    // Update or create cart item
    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      },
      update: {
        quantity: quantity
      },
      create: {
        cartId: cart.id,
        productId,
        quantity
      }
    });

    // Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Remove item from cart
export async function DELETE(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = getTokenFromHeader(authHeader);
    const decoded = verifyToken(token);

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Get cart
    const cart = await prisma.cart.findFirst({
      where: { userId: decoded.userId }
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Remove item
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    });

    // Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 