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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. User ko mitti (DB) mein dhundo
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Bhai, ye banda Deeh par nahi hai!" });

        // 2. Password check karo (Hash comparison)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Galat password! Dubara koshish kar." });

        // 3. JWT Token generate karo (Deeh ka ID Card)
        const payload = { user: { id: user.id } };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }, // 7 din tak login rahega
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token, 
                    user: { username: user.username, vibeScore: user.vibeScore } 
                });
            }
        );

    } catch (err) {
        res.status(500).send("Server pe load hai, baad mein aao!");
    }
};

