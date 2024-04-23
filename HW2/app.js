const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'Book';

// Secret key for JWT token
const jwtSecret = 'urmom';

// Connect to MongoDB
const client = new MongoClient(url);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToMongoDB();

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await usersCollection.insertOne({ username, password: hashedPassword });
    res.json({ message: 'User created successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the username exists
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Issue a JWT token
    const token = jwt.sign({ username }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
});

// Logout endpoint
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
