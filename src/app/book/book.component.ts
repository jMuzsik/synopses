import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"]
})
export class BookComponent implements OnInit {
  //DO NOT RENDER PAGE UNLESS YOU'VE GOT DATA
  isDataAvailable: boolean = false;

  //DROPDOWNS
  wikiVisible: boolean = false;
  goodreadsVisible: boolean = false;

  //WIKI HAS NO TITLES, MAKE IT SOMEWHAT READABLE
  periods: number[];

  //ALL THE DATA FROM API CALLS
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
  wikipedia: string[];

  constructor(private route: ActivatedRoute, private http: Http) {}

  initialize() {
    var viewer = new google.books.DefaultViewer(
      document.getElementById("viewerCanvas")
    );
    viewer.load("ISBN:0738531367");
  }

  getData() {
    var bookPath = this.route.snapshot.url[1].path;
    return this.http.get(`/api/${bookPath}`).map(x => {
      x = JSON.parse(x._body)[0];

      //TAKE CARE OF CONFUSION WITHIN WIKI TEXT
      x["periods"] = [];
      var periodCounter = 0;
      x["wikipedia_text"] = x["wikipedia_text"].split("\n").filter((str, i) => {
        if (str.length > 0) {
          let period = str.indexOf(".");
          x["periods"][periodCounter] = period;
          periodCounter++;
          return str;
        }
      });

      //TAKE CARE OF CONFUSION WITHIN GOODREADS TEXT
      x["goodreads_description"] = x["goodreads_description"]
        .split("<br /><br />")
        .filter(str => str)
        .map((str, i) => {
          str = str.replace(/<i>/g, "");
          str = str.replace(/<\/i>/g, "");
          return str;
        });
      return x;
    });
  }

  showWiki(): void {
    if (!this.wikiVisible) {
      this.wikiVisible = true;
    } else {
      this.wikiVisible = false;
    }
  }

  showGoodreads(): void {
    if (!this.goodreadsVisible) {
      this.goodreadsVisible = true;
    } else {
      this.goodreadsVisible = false;
    }
  }

  ngOnInit() {
    this.getData().subscribe(
      data => {
        this.amazonReview = data["amazon_editorial_review"];
        this.amazonCustomerReviews = data["amazon_reviews"];
        this.amazonSimilarProducts = data["amazon_similar_products"];
        this.author = data["author_name"];
        this.backCover = data["back_cover"];
        this.frontCover = data["front_cover"];
        this.authorImage = data["goodreads_author_image"];
        this.authorLink = data["goodreads_author_link"];
        this.goodreadsDescription = data["goodreads_description"];
        this.goodreadsReviewsWidget = data["goodreads_reviews_widget"];
        this.goodreadsSimilarBooks = data["goodreads_similar_books"];
        this.penguinData = data["penguin_data"];

        this.bookTitle = data["title"];
        //INPUT LOWERCASE LETTERS, MAKE FIRST LETTER UPPERCASE
        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        this.bookTitle = capitalizeFirstLetter(this.bookTitle);

        //FIX ITALICS WITHIN GOODREADS DESCRIPTION
        this.wikipedia = data["wikipedia_text"];
        this.isDataAvailable = true;
        this.periods = data["periods"];
      },
      err => console.log(err),
      () => console.log("SUCCESS!!")
    );
  }
}
