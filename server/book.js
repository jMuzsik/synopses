var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    id: Number,
    author_img: String,
    book_img: String,
    reviews: String,
    penguin_data: String,
    isbn: String,
    wikipedia: String,
    title: String,
    url_title: String,
    created_at: { type: Date, default: Date.now },
    storage_array_one: [],
    storage_array_two: []
})

bookSchema.pre('save', function (next) {
    this.url_title = this.title.replace(/ /g, "_");
    next();
})

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
