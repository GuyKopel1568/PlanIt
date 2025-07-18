import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res
      .status(200)
      .json({ message: `${result.deletedCount} users deleted successfully` });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await User.findOneAndDelete({ email });
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const insertDemoUsers = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'test/TwentyUsers.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);

    for (const user of users) {
      const exists = await User.findOne({
        $or: [{ email: user.email }, { username: user.username }],
      });

      if (!exists) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          password: hashedPassword,
        });

        console.log(`✅ Inserted: ${user.email}`);
      } else {
        console.log(`⏭️ Skipped (already exists): ${user.email}`);
      }
    }

    res.status(201).json({ message: '✅ All done! Users inserted.' });
    console.log('🎉 All done!');
  } catch (err) {
    console.error('❌ Error inserting users:', err);
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId, '-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
