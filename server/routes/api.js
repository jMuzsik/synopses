const router = require("express").Router();

const Book = require("../book.js");

const getAllTheData = require("../getAllData");

router.get("/", (req, res) => {
  const query = Book.find({}).select(
    "exact_title front_cover goodreads_description url_title -_id"
  );

  query
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
    .select("title -_id")
    .then(books => {
      let check = true;
      // If the title was never entered
      if (typeof query.title !== "string") check = false;
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

module.exports = router;
