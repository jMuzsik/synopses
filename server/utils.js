const db = require("./mongoose.js");
const Book = require("./book.js");

function checkIfAlreadyCreated(isbn) {
  let check = false;
  Book.find({}).then(books => {
    books.forEach(book => {
      if (book.isbn === isbn) {
        check = true;
      }
    });
  });
  return check;
}

module.exports = { checkIfAlreadyCreated };
