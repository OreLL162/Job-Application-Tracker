import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(403).json({ msg: 'Invalid or expired token.' });
  }
}