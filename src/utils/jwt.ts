import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '5929c7d8a31a651951aa5813f00745eb52f0ac6e';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h',
  });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getTokenFromHeader = (authHeader: string | undefined): string => {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Invalid authentication header');
  }
  return authHeader.split(' ')[1];
}; 