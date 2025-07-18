import jwt from 'jsonwebtoken';

export const validateRegister = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid input type' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 6 characters long' });
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({
      error: 'Username can only contain letters, numbers, and underscores',
    });
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
    return res
      .status(400)
      .json({ error: 'First name and last name can only contain letters' });
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({
      error: 'Username can only contain letters, numbers, and underscores',
    });
  }

  // If all validations pass, proceed to the next middleware or route handler
  next();
};

export const protectWithJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
