var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var utils = require("./utils");

var checkAllURLS = utils.checkAllURLS;
var checkAllStrings = utils.checkAllStrings;

var bookSchema = new Schema({
  id: Number,
  front_cover: String,
  back_cover: String,
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
  this.url_title = this.title.replace(/ /g, "_");
  if(this.url_title[this.url_title.length-1] === ' ') {
    this.url_title = this.url_title.slice(0, -1);
  }
  console.log(this.url_title);
  //MAKE SURE WHAT IS SUPPOSED TO BE AN URL IS AN URL
  [
    this.front_cover,
    this.back_cover,
    this.goodreads_author_image,
    this.goodreads_author_link
  ] = checkAllURLS(
    this.front_cover,
    this.back_cover,
    this.goodreads_author_image,
    this.goodreads_author_link
  );

  //MAKE SURE WHAT IS A STRING IS NOT AN EMPTY STRING
  [
    this.amazon_editorial_review,
    this.isbn,
    this.wikipedia,
    this.goodreads_description,
    this.author_name,
    this.penguin_data
  ] = checkAllStrings(
    this.amazon_reviews,
    this.amazon_editorial_review,
    this.isbn,
    this.wikipedia,
    this.goodreads_description,
    this.author_name,
    this.penguin_data
  );

  next();
});

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
