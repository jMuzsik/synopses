const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: Number,
  front_cover: String,
  goodreads_description: String,
  goodreads_reviews_widget: String,
  goodreads_author_image: String,
  goodreads_author_link: String,
  goodreads_similar_books: Array,
  penguin_data: Array,
  author_name: String,
  author: String,
  isbn: String,
  wikipedia_text: String,
  title: String,
  url_title: String,
  exact_title: String,
  created_at: { type: Date, default: Date.now },
  url_author: String,
  updated_at: { type: Date, default: Date.now },
});

bookSchema.pre("save", function(next) {
  this.url_title =
    this.title.split(" ").join("_") + "_" + this.author.split(" ").join("_");
  if (this.url_title[this.url_title.length - 1] === "_") {
    this.url_title = this.url_title.slice(0, this.url_title.length - 1);
  }
  next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
