import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    // קבל את ההדר בכל צורה (רישיות/ללא רישיות) + נקה רווחים
    const auth = req.headers.authorization || req.headers.Authorization || '';
    const [scheme, rawToken] = auth.split(' ');
    const token = rawToken?.trim();

    if (!token || !/^Bearer$/i.test(scheme)) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    // אבחון: ודא שיש SECRET טעון
    if (!process.env.JWT_SECRET) {
      console.error(
        'JWT_SECRET is missing! Did you load dotenv before routes?'
      );
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    // אימות הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws on error
    if (!decoded?.userId) {
      return res.status(401).json({ message: 'Token payload missing userId' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    // לוג מפורש כדי לדעת מה באמת קרה
    console.error('JWT verify error:', error.name, error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      // כולל "invalid signature", "jwt malformed", "invalid token"
      return res
        .status(401)
        .json({ message: error.message || 'Token is not valid' });
    }
    if (error.message?.includes('secret or public key must be provided')) {
      return res
        .status(500)
        .json({ message: 'Server misconfiguration (missing secret)' });
    }
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
