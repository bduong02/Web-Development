// Bryan Duong
// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let authors = [];
let books = [];

// Add an author
app.post('/authors', (req, res) => {
    const { fullName, bio, birthDate, primaryGenre } = req.body;
    const author = { id: authors.length + 1, fullName, bio, birthDate, primaryGenre };
    authors.push(author);
    res.status(201).json(author);
});

// List all authors
app.get('/authors', (req, res) => {
    res.status(200).json(authors);
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


// Add a book
app.post('/books', (req, res) => {
    const { title, subtitle, origPubDate, tags, primAuthor } = req.body;
    const book = { id: books.length + 1, title, subtitle, origPubDate, tags, primAuthor };
    books.push(book);
    res.status(201).json(book);
});

// List all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// List all books that match a given list of tags
app.get('/books/by-tags', (req, res) => {
    const tags = req.query.tags.split(','); // Split the string into an array
    const filteredBooks = books.filter(book => tags.every(tag => book.tags.includes(tag)));
    res.status(200).json(filteredBooks);
});


// List all books by a specific author
app.get('/books/by-author/:authorId', (req, res) => {
    const authorId = req.params.authorId;
    const authorBooks = books.filter(book => book.primAuthor === parseInt(authorId));
    res.status(200).json(authorBooks);
});

// Get the details of a specific book
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id === parseInt(bookId));
    if (!book) {
        res.status(404).json({ message: 'Book not found' });
    } else {
        res.status(200).json(book);
    }
});


// Update any of the attributes of a specific book
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1) {
        res.status(404).json({ message: 'Book not found' });
    } else {
        // Update all relevant attributes of the book
        books[index] = { ...books[index], ...updatedBook };
        res.status(200).json(books[index]);
    }
});


// Remove a book (and by extension all its editions)
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1) {
        res.status(404).json({ message: 'Book not found' });
    } else {
        books.splice(index, 1);
        res.status(204).send();
    }
});

// Add an edition of a specific book
app.post('/books/:id/editions', (req, res) => {
    const bookId = req.params.id;
    const {editionNumber, publicationDate} = req.body;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1) {
        res.status(404).json({message: 'Book not found'});
    } else {
        const edition = {editionNumber, publicationDate};
        if (!books[index].bookEditions) {
            books[index].bookEditions = [edition];
        } else {
            books[index].bookEditions.push(edition);
        }
        res.status(201).json(edition);
    }
});

// List editions of a specific book
app.get('/books/:id/editions', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1 || !books[index].bookEditions) {
        res.status(404).json({ message: 'Book or editions not found' });
    } else {
        res.status(200).json(books[index].bookEditions);
    }
});

// Remove an edition of a specific book
app.delete('/books/:bookId/editions/:editionId', (req, res) => {
    const {bookId, editionId} = req.params;
    const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
    if (bookIndex === -1 || !books[bookIndex].bookEditions) {
        res.status(404).json({message: 'Book or editions not found'});
    } else {
        const editionIndex = books[bookIndex].bookEditions.findIndex(edition => edition.editionNumber === parseInt(editionId));
        if (editionIndex === -1) {
            res.status(404).json({message: 'Edition not found'});
        } else {
            books[bookIndex].bookEditions.splice(editionIndex, 1);
            res.status(204).send();
        }
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
