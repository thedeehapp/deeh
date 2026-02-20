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

