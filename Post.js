const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: { type: String, required: true },
    caption: { type: String, maxLength: 300 },
    location: { type: String, default: "Deeh Global" },
    vibeCount: { type: Number, default: 0 }, // Likes ki jagah "Vibe"
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
router.get('/vibe-feed', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('user', ['username', 'vibeScore'])
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            count: posts.length,
            page: page,
            posts: posts
        });
    } catch (err) {
        res.status(500).send("Pagination fail ho gaya!");
    }
});


