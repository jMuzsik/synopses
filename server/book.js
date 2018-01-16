var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    author_img: String,
    book_img: String,
    reviews: String,
    penguin_data: String,
    isbn: String,
    wikipedia: String
})

var Book = mongoose.model('Book', bookSchema)

module.exports = Book
