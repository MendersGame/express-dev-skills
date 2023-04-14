import { Book } from "../models/book.js"

function index(req, res) {
  Book.find({})
  .then(books => {
    res.render('books/index', {
      books: books,
      time: req.time
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function newBook(req, res) {
  res.render('books/new')
}

function create(req, res) {
  console.log(req.body)
  req.body.done = false
  Book.create(req.body)
  .then(book => {
    res.redirect('/books')
  })
  .catch(error => {
    console.log(error);
  })
}

function show(req, res) {
  console.log(req.params.bookId)
  Book.findById(req.params.bookId)
  .then(book => {
    console.log(book)
    res.render('books/show', {
      book: book
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/books')
  })
}

function deleteBook(req, res) {
  Book.findByIdAndDelete(req.params.bookId)
  .then(book => {
    res.redirect('/books')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/books')
  })
}

export {
  index,
  newBook as new,
  create,
  show,
  deleteBook as delete
}