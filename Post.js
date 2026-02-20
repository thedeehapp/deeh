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

