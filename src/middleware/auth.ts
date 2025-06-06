import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken, getTokenFromHeader } from '../utils/jwt';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = getTokenFromHeader(authHeader);
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const isAdmin = (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
}; 