const db = require("./mongoose.js");
var Book = require("./book.js");

function checkIfAlreadyCreated(isbn) {
  var check = false;
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
