// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample Route for "Deeh" Tadka
app.get('/', (req, res) => {
    res.send('Welcome to Deeh: Apni Mitti, Apni Vibe! 🚀');
});

// Database Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Deeh Server running on port ${PORT}`));
    })
    .catch((err) => console.log("Mitti se judne mein dikkat hui: ", err));

