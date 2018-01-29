import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Book } from "../book";

import { BookService } from "../book.service";

import { createBookObject } from "../utils";

interface ToggleButton {
  wikiVisible: boolean = false;
  goodreadsVisible: boolean = false;
  amazonDescriptionVisible: boolean = false;
  goodreadsReviewVisible: boolean = false;
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
    goodreadsReviewVisible: false
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

  // initialize() {
  //   var viewer = new google.books.DefaultViewer(
  //     document.getElementById("viewerCanvas")
  //   );
  //   viewer.load("ISBN:0738531367");
  // }

  toggle(name: string): void {
    if (!this.buttonToggle[name]) {
      this.buttonToggle[name] = true;
    } else {
      this.buttonToggle[name] = false;
    }
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
