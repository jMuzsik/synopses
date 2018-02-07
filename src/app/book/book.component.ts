import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Book } from "../book";

import { BookService } from "../book.service";

import { createBookObject } from "../utils";

declare var jQuery: any;

interface ToggleButton {
  wikiVisible: boolean;
  goodreadsVisible: boolean;
  amazonDescriptionVisible: boolean;
  goodreadsReviewVisible: boolean;
  amazonReviewVisible: boolean;
  amazonSimilarBooksVisible: boolean;
  goodreadsSimilarBooksVisible: boolean;
  penguinDataVisible: boolean;
}

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"]
})
export class BookComponent implements OnInit {
  @ViewChild('modal') modal:ElementRef;

  //THE BOOK
  book: Book;

  //DO NOT RENDER PAGE UNLESS YOU'VE GOT DATA
  isDataAvailable: boolean = false;

  //DROPDOWNS
  buttonToggle: ToggleButton = {
    wikiVisible: false,
    goodreadsVisible: false,
    amazonDescriptionVisible: false,
    goodreadsReviewVisible: false,
    amazonReviewVisible: false,
    amazonSimilarBooksVisible: false,
    goodreadsSimilarBooksVisible: false,
    penguinDataVisible: false
  };

  //WIKI HAS NO TITLES, MAKE IT SOMEWHAT READABLE
  periods: number[];

  showBook: boolean = true;

  //IS THE DATA LOADING?
  dataLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public sanitizer: DomSanitizer
  ) {}

  toggle(): void {
    // if (!this.buttonToggle[name]) {
    //   this.turnOff();
    //   this.buttonToggle[name] = true;
    // } else {
    //   this.turnOff();
    //   this.buttonToggle[name] = false;
    // }
    jQuery("#modal").modal('show');

  }

  alterView(): void {
    this.showBook = !this.showBook;
  }

  // turnOff(): void {
  //   const keys = Object.keys(this.buttonToggle);
  //   keys.forEach(key => {
  //     this.buttonToggle[key] = false;
  //   });
  // }

  penguinDataErrors(data: any): string[] {
    if (data.length > 0) {
      return data.map(data => {
        if (data["author"] === undefined) {
          data["author"] = "Some reason, no author";
        } else {
          data["author"] = data["author"][0];
        }
        if (data["description"] === undefined) {
          data["description"] = "Some reason, no description";
        } else {
          data["description"] = data["description"][0];
        }
        return data;
      });
    } else {
      return data;
    }
  }

  getBook(): void {
    var bookPath = this.route.snapshot.url[1].path;
    this.bookService.getBook(bookPath).subscribe(
      data => {
        this.book = createBookObject(data);
        this.periods = data["periods"];
        this.isDataAvailable = true;
        this.book["penguinData"] = this.penguinDataErrors(
          this.book.penguinData
        );
        console.log(this.book);
      },
      err => console.log(err),
      () => {
        console.log("SUCCESS!!!!");
      }
    );
  }

  ngOnInit(): void {
    this.getBook();
  }
}
