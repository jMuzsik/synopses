var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var utils = require("./utils");

var checkAllURLS = utils.checkAllURLS;
var checkAllStrings = utils.checkAllStrings;

var bookSchema = new Schema({
  id: Number,
  front_cover: String,
  amazon_reviews: Array,
  amazon_editorial_review: String,
  amazon_similar_products: Array,
  goodreads_description: String,
  goodreads_reviews_widget: String,
  goodreads_author_image: String,
  goodreads_author_link: String,
  goodreads_similar_books: Array,
  penguin_data: Array,
  author_name: String,
  isbn: String,
  wikipedia_text: String,
  title: String,
  url_title: String,
  created_at: { type: Date, default: Date.now }
});

bookSchema.pre("save", function(next) {
  this.url_title = this.title.replace(/ /g, "_").trim();
  next();
});

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
