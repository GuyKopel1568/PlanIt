const express = require('express');
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
  insertTwentyUsers,
} = require('../controllers/userController');

const validateUserRegistration = require('../middleware/validateRegistration');

const router = express.Router();

// ROUTES
router.post('/createUser', validateUserRegistration, createUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);
router.delete('/deleteUser/:id', deleteUser);
router.delete('/deleteAllUsers', deleteAllUsers);
router.post('/insertTwentyUsers', insertTwentyUsers);
router.patch('/updateUser/:id', updateUser);

module.exports = router;
