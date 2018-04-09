var request = require("request-promise");

var getRankOfBook = require("../utils").getRankOfBook;

var getISBN = function(query, author, callback) {
  var options = {
    uri: `http://api.isbndb.com/books/${query}`,
    headers: {
      "x-api-key": process.env.ISBNDB_KEY,
    },
  };

  return request(options)
    .then(function(data) {
      let saved = {};
      let booksLevel = [];
      let level = 0;
      let books = [];
      try {
        books = JSON.parse(data).books;
      } catch (e) {
        console.log("within isbn parsing ERROR", e);
        return {
          isbn: 9789892327914,
          exact_title: "failed",
          front_cover:
            "https://pictures.abebooks.com/isbn/9780834800793-us.jpg",
        };
      }

      // Simple comparison to be sure that the first object returned from the ISBNDB query is not what
      // is used but rather the title and author most similar to what the user entered in the form
      let desiredIdx = 0; // The book title that is most similar to what the user entered
      let maxValue = 0; // Most similar book atm

      books.forEach((book, i) => {
        let splitAuthor = [],
          splitAuthorQuery = [];
        let splitQuery = query.toLowerCase().split(" ");
        let splitBook = book.title.toLowerCase().split(" ");
        try {
          splitAuthor = book.authors[0].toLowerCase().split(" ");
          splitAuthorQuery = author.toLowerCase().split(" ");
        } catch (e) {
          console.log("The author in ISBNDB query is missing.");
        }
        const level = getRankOfBook(splitBook, splitQuery, splitAuthor, splitAuthorQuery);
        booksLevel[i] = level;
      });
      booksLevel.forEach((value, idx) => {
        if (maxValue < value) {
          maxValue = value;
          desiredIdx = idx;
        }
      });
      saved = books[desiredIdx];
      saved["exact_title"] = books[desiredIdx].title;
      return saved;
    })
    .catch(function(err) {
      console.log("ISBNDB FAILED TO GET DATA", err);
      return {
        isbn: 9789892327914,
        exact_title: "failed",
        front_cover: "https://pictures.abebooks.com/isbn/9780834800793-us.jpg",
      };
    });
};
module.exports = getISBN;
