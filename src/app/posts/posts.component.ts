import { Component, OnInit } from '@angular/core';

import { Book } from '../book';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  model = new Book(1, "front_cover", "back_cover", ["amazon_reviews", "amazon_reviews"], "amazon_editorial_review", ["amazon_similar_products", "amazon_similar_products"], "goodreads_description", "goodreads_reviews_widget,", "goodreads_author_image", "goodreads_author_link", ["goodreads_similar_books", "goodreads_similar_books"], ["penguin_data", "penguin_data"], "author_name", "isbn", "wikipedia_text", "title")

  submitted = false;

  onSubmit() { this.submitted = true; }

  newBook(incoming) {
    this.model = new Book(/*need to do a lot of shit prior!*/)
  }

}
