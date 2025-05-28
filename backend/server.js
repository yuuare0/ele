const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const exists = await User.findOne({ where: { username } });
        if (exists) return res.status(400).json({ message: 'User exists' });

        await User.create({ username, password });
        res.json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username, password } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err });
    }
});

app.listen(3002, () => console.log('Auth server running on http://localhost:3002'));
