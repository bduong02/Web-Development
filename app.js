// Bryan Duong
// app.js
// 4/11/24

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let authors = [];
let books = [];

// Adds an author
app.post('/authors', (req, res) => {
    const { fullName, bio, birthDate, primGenre } = req.body;
    const author = { id: authors.length + 1, fullName, bio, birthDate, primGenre };
    authors.push(author);
    res.status(201).json(author);
});

// Lists all authors added
app.get('/authors', (req, res) => {
    res.status(200).json(authors);
});

// Updates an existing author
app.put('/authors/:id', (req, res) => {
    const authorId = req.params.id;
    const { fullName, bio, birthDate, primGenre } = req.body;
    const authorIndex = authors.findIndex(author => author.id === parseInt(authorId));
    if (authorIndex === -1) {
        res.status(404).json({ message: 'Author is not found' });
    } else {
        authors[authorIndex] = { id: parseInt(authorId), fullName, bio, birthDate, primGenre };
        res.status(200).json(authors[authorIndex]);
    }
});

// Retrieves an author based on the authorId
app.get('/authors/:id', (req, res) => {
    const authorId = req.params.id;
    const author = authors.find(author => author.id === parseInt(authorId));
    if (!author) {
        res.status(404).json({ message: 'Author is not found' });
    } else {
        res.status(200).json(author);
    }
});


// Adds a book
app.post('/books', (req, res) => {
    const { title, subtitle, origPubDate, tags, primAuthor } = req.body;
    const book = { id: books.length + 1, title, subtitle, origPubDate, tags, primAuthor };
    books.push(book);
    res.status(201).json(book);
});

// Lists all the books that were added
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// Lists all books that match the given list of tags
app.get('/books/by-tags', (req, res) => {
    const tags = req.query.tags.split(','); // Split the string into an array
    const filteredBooks = books.filter(book => tags.every(tag => book.tags.includes(tag)));
    res.status(200).json(filteredBooks);
});


// Lists all books based on the specified author
app.get('/books/by-author/:authorId', (req, res) => {
    const authorId = req.params.authorId;
    const authorBooks = books.filter(book => book.primAuthor === parseInt(authorId));
    res.status(200).json(authorBooks);
});

// Retrieves the details of a specific book
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id === parseInt(bookId));
    if (!book) {
        res.status(404).json({ message: 'Book is not found' });
    } else {
        res.status(200).json(book);
    }
});


// Updates any of the attributes of a specific book
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1) {
        res.status(404).json({ message: 'Book is not found' });
    } else {
        // Update all relevant attributes of the book
        books[index] = { ...books[index], ...updatedBook };
        res.status(200).json(books[index]);
    }
});


// Removes a book and its editions
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1) {
        res.status(404).json({ message: 'Book is not found' });
    } else {
        books.splice(index, 1);
        res.status(204).send();
    }
});

// Adds an edition of a specific book
app.post('/books/:id/editions', (req, res) => {
    const bookId = req.params.id;
    const { editionNumber, pubDate } = req.body;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1) {
        res.status(404).json({ message: 'Book is not found' });
    } else {
        const edition = { editionNumber, pubDate };
        if (!Array.isArray(books[index].bookEditions)) {
            books[index].bookEditions = [edition];
        } else {
            books[index].bookEditions.push(edition);
        }
        res.status(201).json(edition);
    }
});

// Lists editions of a specific book
app.get('/books/:id/editions', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id === parseInt(bookId));
    if (index === -1 || !books[index].bookEditions) {
        res.status(404).json({ message: 'Book or editions not found' });
    } else {
        res.status(200).json(books[index].bookEditions);
    }
});

// Removes an edition of a specific book
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
