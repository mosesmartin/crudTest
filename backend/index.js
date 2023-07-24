const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // You can choose any port you like

app.use(cors());
app.use(bodyParser.json());

// Sample data for demonstration
let books = [
  { id: 1, bookName: 'Book 1', author: 'Author 1', genre: 'Genre 1' },
  { id: 2, bookName: 'Book 2', author: 'Author 2', genre: 'Genre 2' },
];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  books = books.map((book) => (book.id === bookId ? { ...updatedBook, id: bookId } : book));
  res.json(updatedBook);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);
  
  // Reassign new id values after deletion
  books = books.map((book, index) => ({ ...book, id: index + 1 }));
  
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
