var request = require("request-promise");

var getISBN = function(query, author, callback) {
  var options = {
    uri: `http://api.isbndb.com/books/${query}`,
    headers: {
      "x-api-key": process.env.ISBNDB_KEY
    }
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
        return {
          isbn: 9789892327914,
          exact_title: "failed",
          front_cover: "https://pictures.abebooks.com/isbn/9780834800793-us.jpg"
        };
      }
      let desiredIdx = 0;
      let maxValue = 0;
      books.forEach((book, i) => {
        let splitQuery = query.toLowerCase().split(" ");
        let splitBook = book.title.toLowerCase().split(" ");
        let splitAuthor = book.authors[0].toLowerCase().split(" ");
        let splitAuthorQuery = author.toLowerCase().split(" ");
        level = 0;
        if (splitBook[0] === splitQuery[0]) level++;
        if (splitBook[1] === splitQuery[1]) level++;
        if (splitBook[2] === splitQuery[2]) level++;
        if (splitBook[3] === splitQuery[3]) level++;
        if (splitBook[4] === splitQuery[4]) level++;
        if (splitAuthor[0] === splitAuthorQuery[0]) level++;
        if (splitAuthor[1] === splitAuthorQuery[1]) level++;
        if (splitAuthor[2] === splitAuthorQuery[2]) level++;
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
      console.log(err);
      return {
        isbn: 9789892327914,
        exact_title: "failed",
        front_cover: "https://pictures.abebooks.com/isbn/9780834800793-us.jpg"
      };
    });
};
module.exports = getISBN;
