export class Book {

  constructor(
      public id: Number,
      public front_cover: String,
      public back_cover: String,
      public amazon_reviews: Array <String>,
      public amazon_editorial_review: String,
      public amazon_similar_products: Array <String>,
      public goodreads_description: String,
      public goodreads_reviews_widget: String,
      public goodreads_author_image: String,
      public goodreads_author_link: String,
      public goodreads_similar_books: Array <String>,
      public penguin_data: Array <String>,
      public author_name: String,
      public isbn: String,
      public wikipedia_text: String,
      public title: String
  ){ }
}
