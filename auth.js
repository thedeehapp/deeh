const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// @route POST /api/auth/register
router.post('/register', register);

module.exports = router;
// @route POST /api/auth/login
router.post('/login', require('../controllers/authController').login);


