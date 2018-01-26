import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Book } from '../book';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  model = new Book(1, "front_cover", "back_cover", ["amazon_reviews", "amazon_reviews"], "amazon_editorial_review", ["amazon_similar_products", "amazon_similar_products"], "goodreads_description", "goodreads_reviews_widget,", "goodreads_author_image", "goodreads_author_link", ["goodreads_similar_books", "goodreads_similar_books"], ["penguin_data", "penguin_data"], "author_name", "isbn", "wikipedia_text", "title")

  submitted = false;

  constructor(private http: HttpClient) { }

  onSubmit() { this.submitted = true; }

  newBook(incoming) {
    var data = {
      data: incoming.value
    }
    this.http.post('/api', data, {}).subscribe(data => {
      console.log("SUCCESS!!!!!")
    }).catch(console.error)
  }

}
