import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  console.log(req.body);
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
  });
};

export const google = async (req, res) => {
  try {
    const { email, firstName, lastName, username } = req.body;
    console.log('BODY ==>', email, firstName, lastName, username);
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: rest,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        username:
          username.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.status(201).json({
        message: 'User created and logged in successfully',
        token,
        user: rest,
      });
    }
  } catch (error) {
    console.error('Error during Google login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const facebook = async (req, res) => {
  try {
    const { email, firstName, lastName, username } = req.body;

    if (!email || !firstName || !lastName || !username) {
      return res.status(400).json({ error: 'Missing required user data' });
    }

    console.log('📥 Facebook login BODY =>', {
      email,
      firstName,
      lastName,
      username,
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );

      const { password, ...userData } = existingUser._doc;

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: userData,
      });
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const cleanUsername =
      username.split(' ').join('').toLowerCase() +
      Math.random().toString(36).slice(-4);

    const newUser = await User.create({
      firstName,
      lastName,
      username: cleanUsername,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const { password, ...userData } = newUser._doc;

    return res.status(201).json({
      message: 'User created and logged in successfully',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('❌ Error during Facebook login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
