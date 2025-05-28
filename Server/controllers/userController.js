const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const User = require('../modules/Users');

async function createUser(req, res) {
  try {
    const userData = { ...req.body };
    userData.password = await bcrypt.hash(userData.password, 10);
    delete userData.confirmPassword;
    const user = new User(userData);
    const savedUser = await user.save();
    res.status(201).json({
      status: '201 success',
      message: 'User created successfully',
      userId: savedUser._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = { ...req.body };

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: '200 success',
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

async function deleteAllUsers(req, res) {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete all users' });
  }
}

async function insertTwentyUsers(req, res) {
  // 1. Read the JSON data from the .txt file
  const filePath = path.join(__dirname, '../tests/users.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(fileContent);

  let insertedCount = 0;
  let skippedCount = 0;

  for (const user of users) {
    const existUser = await User.findOne({ email: user.email });
    if (existUser) {
      skippedCount++;
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashedPassword });
    insertedCount++;
  }

  res.status(201).json({
    message: 'User insertion complete',
    details: {
      inserted: `${insertedCount} users inserted`,
      skipped: `${skippedCount} users skipped`,
    },
  });
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
  insertTwentyUsers,
};
