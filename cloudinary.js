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

