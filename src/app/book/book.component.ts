import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Book } from "../book";

import { BookService } from "../book.service";

import { createBookObject } from "../utils";

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
  styleUrls: ["./book.component.css"]
})
export class BookComponent implements OnInit {
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

  //IS THE DATA LOADING?
  dataLoading: boolean = true;

  // @Input() book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public sanitizer: DomSanitizer
  ) {}

  toggle(name: string): void {
    if (!this.buttonToggle[name]) {
      this.turnOff();
      this.buttonToggle[name] = true;
    } else {
      this.turnOff();
      this.buttonToggle[name] = false;
    }
  }

  turnOff(): void {
    const keys = Object.keys(this.buttonToggle);
    keys.forEach(key => {
      this.buttonToggle[key] = false;
    });
  }

  getBook(): void {
    var bookPath = this.route.snapshot.url[1].path;
    this.bookService.getBook(bookPath).subscribe(
      data => {
        this.book = createBookObject(data);
        this.periods = data["periods"];
        this.isDataAvailable = true;
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
