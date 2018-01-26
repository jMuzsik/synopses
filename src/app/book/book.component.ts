import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  amazonReview: string;
  amazonCustomerReviews: string[];
  amazonSimilarProducts: string[];
  author: string;
  backCover: string;
  frontCover: string;
  authorImage: string;
  authorLink: string;
  goodreadsDescription: string;
  goodreadsReviewsWidget: string;
  goodreadsSimilarBooks: string[];
  penguinData: string[];
  bookTitle: string;
  wikipedia: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.amazonReview = "";
    this.amazonCustomerReviews = [];
    this.amazonSimilarProducts = [];
    this.author = "";
    this.backCover = "";
    this.frontCover = "";
    this.authorImage = "";
    this.authorLink = "";
    this.goodreadsDescription = "";
    this.goodreadsReviewsWidget = "";
    this.goodreadsSimilarBooks = [];
    this.penguinData = [];
    this.bookTitle = "";
    this.wikipedia = "";
    this.init();
  }



  init(): void {
    var bookPath = this.route.snapshot.url[1].path;
    this.http.get(`/api/${bookPath}`)
      .subscribe(function (data) {
        data = data[0];
        this.amazonReview = data['amazon_editorial_review'];
        this.amazonCustomerReviews = data['amazon_reviews'];
        this.amazonSimilarProducts = data['amazon_similar_products'];
        this.author = data['author_name'];
        this.backCover = data['back_cover'];
        this.frontCover = data['front_cover'];
        this.authorImage = data['goodreads_author_image'];
        this.authorLink = data['goodreads_author_link'];
        this.goodreadsDescription = data['goodreads_description'];
        this.goodreadsReviewsWidget = data['goodreads_reviews_widget'];
        this.goodreadsSimilarBooks = data['goodreads_similar_books'];
        this.penguinData = data['penguin_data'];
        this.bookTitle = data['title'];
        this.wikipedia = data['wikipedia_text'];
      },
      err => console.log(err),
      () => console.log('GOOOOODDD!'))
  };
}
