const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vibeScore: { type: Number, default: 100 }, // Unique feature for Deeh
    bio: { type: String, default: "Deeh par naya hoon!" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

