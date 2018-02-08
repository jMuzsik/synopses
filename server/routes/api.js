const router = require("express").Router();

const db = require("../mongoose.js");
const Book = require("../book.js");

const utils = require("../utils");

const getAllTheData = require("../getAllData");

const getAmazonData = require("../api-calls/index");

const getIsbn = require("../api-calls/isbndb");

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
  console.log("THIS IS IN API CALL: ", query);
  Book.find({ url_title: query })
    .then(book => {
      res.json(book).status(200);
    })
    .catch(err => res.status(400).send(console.error));
});

router.post("/", (req, res) => {
  var query = req.body;

  getAllTheData(query.title, query.author, function(bookData) {
    var book = bookData;
    console.log("PRIOR TO BEING TO THE HOMESTRETCH", book);
    book = new Book(book);
    Book.find({})
      .then(books => {
        var check = true;

        books.forEach(prevBook => {
          if (prevBook.isbn === book.isbn) {
            check = false;
          }
        });

        if (check) {
          book.save(function(error) {
            if (error) {
              console.log(error);
            } else
              return res
                .status(200)
                .send("saved")
                .end();
          });
        } else {
          return res
            .status(201)
            .send({ message: "same book" })
            .end();
        }
      })
      .catch(error => res.status(400).end());
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

router.get("/getid/doit", (req, res) => {
  var cientId = process.env.OAUTH_CLIENT_ID;
  var clientDomain = process.env.OAUTH_CLIENT_DOMAIN;
  res.send([clientId, clientDomain]).status(200);
});

module.exports = router;
