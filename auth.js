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
// @route GET /api/auth/profile/:username
router.get('/profile/:username', async (req, res) => {
    try {
        // User ko dhundo uske username se
        const user = await User.findOne({ username: req.params.username }).select('-password');
        if (!user) return res.status(404).json({ msg: "Bhai, ye banda Deeh par nahi mila!" });

        // Is user ki saari posts nikaalo
        const Post = require('../models/Post');
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

        res.json({
            user,
            posts,
            postCount: posts.length
        });
    } catch (err) {
        res.status(500).send("Profile load karne mein mitti ud gayi!");
    }
});



