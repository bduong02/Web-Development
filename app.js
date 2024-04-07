const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let authors = [];

// Get all authors
app.get('/authors', (req, res) => {
    res.status(200).json(authors);
});

// Get an author by ID
app.get('/authors/:id', (req, res) => {
    const authorId = req.params.id;
    const author = authors.find(author => author.id === parseInt(authorId));
    if (!author) {
        res.status(404).json({ message: 'Author not found' });
    } else {
        res.status(200).json(author);
    }
});

// Create a new author
app.post('/authors', (req, res) => {
    const { fullName, bio, birthDate, primaryGenre } = req.body;
    const author = { id: authors.length + 1, fullName, bio, birthDate, primaryGenre };
    authors.push(author);
    res.status(201).json(author);
});

// Update an existing author
app.put('/authors/:id', (req, res) => {
    const authorId = req.params.id;
    const { fullName, bio, birthDate, primaryGenre } = req.body;
    const authorIndex = authors.findIndex(author => author.id === parseInt(authorId));
    if (authorIndex === -1) {
        res.status(404).json({ message: 'Author not found' });
    } else {
        authors[authorIndex] = { id: parseInt(authorId), fullName, bio, birthDate, primaryGenre };
        res.status(200).json(authors[authorIndex]);
    }
});

// Delete an author
app.delete('/authors/:id', (req, res) => {
    const authorId = req.params.id;
    const authorIndex = authors.findIndex(author => author.id === parseInt(authorId));
    if (authorIndex === -1) {
        res.status(404).json({ message: 'Author not found' });
    } else {
        authors.splice(authorIndex, 1);
        res.status(204).send();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
