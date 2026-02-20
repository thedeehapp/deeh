const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "Bhai, ye email pehle se hai!" });

        // Password ko hash karo (Mitti mein mila do original password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Naya User create karo with 100 Vibe Score
        user = new User({
            username,
            email,
            password: hashedPassword,
            vibeScore: 100 
        });

        await user.save();
        res.status(201).json({ msg: "Deeh par swagat hai!", vibeScore: user.vibeScore });

    } catch (err) {
        res.status(500).send("Server Error: Kuch toh gadbad hai!");
    }
};

