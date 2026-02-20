const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Deeh_Posts',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 1080, height: 1350, crop: 'limit' }] // High quality but optimized
    }
});

module.exports = storage;

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


