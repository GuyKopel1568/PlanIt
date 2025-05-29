const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const validateUserRegistration = require('../middleware/validateRegistration');
const { loginUser } = require('../controllers/userController');
const User = require('../modules/Users');
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
  insertTwentyUsers,
} = require('../controllers/userController');

const router = express.Router();

// ROUTES
router.post('/createUser', validateUserRegistration, createUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);
router.delete('/deleteUser/:id', deleteUser);
router.delete('/deleteAllUsers', deleteAllUsers);
router.post('/insertTwentyUsers', insertTwentyUsers);
router.patch('/updateUser/:id', updateUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
