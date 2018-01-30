const db = require("./mongoose.js");
var Book = require("./book.js");

function checkIfAlreadyCreated(isbn) {
  var check = false;
  console.log('IS BOOK ACTUALLY BEING RETURNED IN FUNCTION', Book)
  Book.find({}).then(books => {
      books.forEach(book => {
        console.log('IS THIS EVER TRUE?', book.isbn, isbn, isbn ===b)
        if (book.isbn === isbn) {
          check = true;
        }
      });
  });
  return check;
}

module.exports = { checkIfAlreadyCreated };
