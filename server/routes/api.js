const router = require("express").Router();

const db = require("../mongoose.js");
const Book = require("../book.js");

const utils = require("../utils");
const getAllTheData = require("../getAllData");
const apiCalls = require("../api-calls/index");
const getAmazonData = apiCalls.getAmazonData;
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
  Book.find({ url_title: query })
    .then(book => {
      res.json(book).status(200);
    })
    .catch(err => res.status(400).send(console.error));
});

router.post("/", (req, res) => {
  const query = req.body;
  Book.find({})
    .then(books => {
      let check = true;
      const title = query.title.toLowerCase();
      books.forEach(prevBook => {
        if (prevBook.title === title) {
          check = false;
        }
      });
      if (check) {
        getAllTheData(query.title, query.author, function(bookData) {
          if (bookData === "failed") {
            return res
              .status(201)
              .send("no results for query")
              .end();
          } else {
            let book = bookData;
            try {
              book.penguin_data.data.facets = "";
            } catch (e) {
              console.log(e);
            }
            book = new Book(book);
            book.save(function(error) {
              if (error) {
                console.log("ERROR SAVING BOOK TO DB", error);
              } else
                return res
                  .status(200)
                  .send("saved")
                  .end();
            });
          }
        });
      } else {
        return res
          .status(201)
          .send("same book")
          .end();
      }
    })
    .catch(error => res.status(400).end());
});

router.put("/:book", (req, res) => {
  const url_title = req.params.book;
  const isbn = req.body.isbn;

  let updateBook = {};

  getAmazonData(isbn)
    .then(function(amazonData) {
      //GRAB AMAZON IFRAME THAT SOMETIMES NEEDS TO BE REFRESHED
      updateBook["amazon_reviews"] = amazonData["amazon_reviews"];
      updateBook["updated_at"] = new Date();
      Book.findOneAndUpdate({ url_title }, updateBook, function(error) {
        if (error) {
          console.log("IF THERE IS AN ERROR FOR PUT REQUEST, IN HERE", error);
        } else {
          return res
            .status(200)
            .send(updateBook["amazon_reviews"])
            .end();
        }
      });
    })
    .catch(error => {
      console.log("IF THERE IS AN ERROR FROM THE AMAZON QUERY", error);
      res.status(401).send({ message: error });
    });
});

module.exports = router;
