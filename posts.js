const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../config/cloudinary');
const upload = multer({ storage });
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// @route POST /api/posts/upload
router.post('/upload', auth, upload.single('image'), async (req, res) => {
    try {
        const newPost = new Post({
            user: req.user.id,
            imageUrl: req.file.path, // Cloudinary URL
            caption: req.body.caption,
            location: req.body.location
        });

        const post = await newPost.save();
        res.json({ msg: "Post live ho gaya!", post });
    } catch (err) {
        res.status(500).send("Upload fail ho gaya, mitti check karo!");
    }
});

module.exports = router;
// @route GET /api/posts/feed
// Description: Get all posts sorted by newest first
router.get('/feed', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', ['username', 'vibeScore']) // User ki details saath mein milengi
            .sort({ createdAt: -1 }); // Naya maal pehle!

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Chopal khali hai, server error!");
    }
});


