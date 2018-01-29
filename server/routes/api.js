const router = require("express").Router();

const db = require("../mongoose.js");
const Book = require("../book.js");

const utils = require("../utils");
const grabTitleAndUrl = utils.grabTitleAndUrl;

const getAllTheData = require("../getAllData");

router.get("/", (req, res) => {
  Book.find({})
    .then(books => {
      res.status(200).send(books);
    })
    .catch(err => {
      res.status(400).send(console.error);
    });
});

router.get("/:book", (req, res) => {
  const query = req.params.book;

  Book.find({ url_title: query })
    .then(book => {
      res.json(book).status(200);
    })
    .catch(err => res.status(400).send(console.error));
});

router.post("/", (req, res) => {
  var isbn = req.body.isbn;

  Book.find({}).then(books => {
    books.forEach(book => {
      if (book.isbn === isbn) {
        res
          .status(201)
          .send({ message: "This book has already been created!!!" });
      }
    });
  });

  getAllTheData(query.title, query.author, function(bookData) {
    var book = bookData;
    book = new Book(book);
    book
      .save(function(error) {
        if (error) console.error(error);
        else console.log("SAVED!!!!!!!");
      })
      .then(res.status(201).send({ message: "Buenisimo!!!" }))
      .catch(error => res.status(401).send({ message: error }));
  });
});

router.put("/:book", (req, res) => {
  var query = req.body;

  Book.find({ url_title: query }).then(book => {
    getAllTheData(book.title, book.author, function(bookData) {
      book = bookData;
      book
        .save(function(error) {
          if (error) console.error(error);
          else console.log("SAVED!!!!!!!");
        })
        .then(res.status(201).send({ message: "Book data refreshed!!!" }))
        .catch(error => res.status(401).send({ message: error }));
    });
  });
});

module.exports = router;
