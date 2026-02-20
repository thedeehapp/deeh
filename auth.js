const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// @route POST /api/auth/register
router.post('/register', register);

module.exports = router;
// @route POST /api/auth/login
router.post('/login', require('../controllers/authController').login);

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: "No token, entry mana hai!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token nakli hai!" });
    }
};



