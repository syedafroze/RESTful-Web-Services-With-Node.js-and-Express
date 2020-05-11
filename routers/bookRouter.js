const express = require("express");
const bookController = require("../controllers/booksController");

function bookRoute(Book) {
  const bookRouter = express.Router();
  const Controller= bookController(Book)
  bookRouter.route("/books/")
  //----------implementing Post-----------------
    //.post(Controller.post)
    .post((req, res) => {
      const book = new Book(req.body);
      book.save(); //saves in DB
      console.log(book);
      return res.status(201).json(book);
    })
    //----------implementing GET----------------
    //.get(Controller.get)
    .get((req, res) => {
     const { query } = req;
      console.log(req.query);
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });


    //implementing middleware
  //middleware  that attaches the particular book object to req object using book id
  // and forward it to the  route
  bookRouter.use("/books/:bookID", (req, res, next) => {
    Book.findById(req.params.bookID, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book; //adding book to req object
        return next();
      }
      return res.sendStatus(404);
    });
  });
  //forwarding to route
  bookRouter
    .route("/books/:bookID")
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book } = req;
    console.log("req",req.book)
      console.log("-------------------book--------------")
      console.log("book",book);
      book.title = req.body.title;
      book.author = req.body.author;
      //console.log("req",req)

      book.save();
      return res.json(book);
    })
    .patch((req, res) => {
      const { book } = req;
      console.log("-------");
      console.log(book);
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}
module.exports = bookRoute;
