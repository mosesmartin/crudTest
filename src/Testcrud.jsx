import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BookCrud = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    bookName: '',
    author: '',
    genre: '',
  });
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const addBook = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      setBooks([...books, response.data]);
      setNewBook({ bookName: '', author: '', genre: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/${editingBookId}`,
        newBook
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === editingBookId ? response.data : book))
      );
      setEditingBookId(null);
      setNewBook({ bookName: '', author: '', genre: '' });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Book CRUD</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                {editingBookId === book.id ? (
                  <Form.Control
                    type="text"
                    name="bookName"
                    value={newBook.bookName}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.bookName
                )}
              </td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
                {editingBookId === book.id ? (
                  <>
                    <Button variant="success" onClick={updateBook}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditingBookId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="warning" onClick={() => setEditingBookId(book.id)}>
                    Update
                  </Button>
                )}
                <Button variant="danger" onClick={() => deleteBook(book.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="bookName"
              placeholder="Book Name"
              value={newBook.bookName}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="genre"
              placeholder="Genre"
              value={newBook.genre}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Button onClick={addBook}>Add Book</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BookCrud;
