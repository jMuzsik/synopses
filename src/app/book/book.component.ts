import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Book } from "../book";

import { BookService } from "../book.service";

import {
  createBookObject,
  reformatPenguinData,
  setUpAmazonSimilarBooks
} from "../utils";

interface ToggleButton {
  wikiVisible: boolean;
  goodreadsReviewVisible: boolean;
  amazonSimilarBooksVisible: boolean;
}

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"]
})
export class BookComponent implements OnInit {
  //THE BOOK
  book: Book;

  //DO NOT RENDER PAGE UNLESS YOU'VE GOT DATA
  isDataAvailable: boolean = false;

  //DROPDOWNS
  buttonToggle: ToggleButton = {
    wikiVisible: false,
    goodreadsReviewVisible: false,
    amazonSimilarBooksVisible: false
  };

  //UNIVERSAL BUTTON WHEN LINK IS PRESSED THAT OPENS MODAL
  buttonVisible: boolean = false;

  //WIKI HAS NO TITLES, MAKE IT SOMEWHAT READABLE
  periods: number[];

  //BOOK OR AUTHOR IN CARD
  showBook: boolean = true;

  //IS THE DATA LOADING?
  dataLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  //CLOSE ANYTHING OPEN FIRST, THEN OPEN THE SPECIFIED ONE
  toggle(name: string): void {
    if (!this.buttonToggle[name]) {
      this.turnOff();
      this.buttonToggle[name] = true;
    } else {
      this.turnOff();
      this.buttonToggle[name] = false;
    }
  }

  //SHOW THE BUTTON
  toggleButton(): void {
    this.buttonVisible = true;
  }

  //SHOW BOOK OR AUTHOR IF NOT SHOWING BOOK, ONE OR THE OTHER
  alterView(): void {
    this.showBook = !this.showBook;
  }

  //CLOSE MODAL IF OPEN
  closeModal(): void {
    this.turnOff();
  }

  //CLOSE ANY MODAL THAT IS OPEN
  turnOff(): void {
    const keys = Object.keys(this.buttonToggle);
    this.buttonVisible = false;
    keys.forEach(key => {
      this.buttonToggle[key] = false;
    });
  }

  //AMAZON REVIEW IFRAME ONLY LASTS FOR A SINGLE DAY, PUT REQUEST NECESSARY IF UPDATED LATER THEN A DAY AGO
  checkForAmazonReviews(): void {
    const now = new Date();
    const past = new Date(this.book["updated"]);
    const bookPath = this.route.snapshot.url[1].path;
    const data = {};
    data["isbn"] = this.book.isbn;
    //CALCULATE HOW MANY DAYS HAS PASSED SINCE THIS BUTTON HAS BEEN PRESSED/DATA HAS BEEN USED
    if (
      Math.floor((now.getTime() - past.getTime()) / (24 * 60 * 60 * 1000)) > 0
    ) {
      this.bookService.putBook(bookPath, data).subscribe(
        data => {
          this.book["amazonCustomerReviews"] = data["IFrameURL"][0];
        },
        error => console.log(error),
        () => {
          this.toggle("amazonReviewVisible");
          this.toggleButton();
          console.log("PUT REQUEST SUCCESS");
        }
      );
    } else {
      this.toggle("amazonReviewVisible");
      this.toggleButton();
    }
  }

  getBook(): void {
    const bookPath = this.route.snapshot.url[1].path;
    this.bookService.getBook(bookPath).subscribe(
      data => {
        this.book = createBookObject(data);
        this.periods = data["periods"];
        try {
          this.book["penguinData"] = reformatPenguinData(
            this.book.penguinData[0]["data"]["results"]
          );
        } catch(e) {
          // do nothing atm
        }
        console.log(this.book)
        if (Array.isArray(this.book["amazonSimilarProducts"])) {
          this.book["amazonSimilarProducts"] = setUpAmazonSimilarBooks(
            this.book["amazonSimilarProducts"]
          );
        }
      },
      err =>
        console.log(
          "IF ERROR IN OBTAINING DATA FROM DB FOR INDIVIDUAL BOOK",
          err
        ),
      () => (this.isDataAvailable = true)
    );
  }
}
