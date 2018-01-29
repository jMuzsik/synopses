import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { Book } from "../book";

import { BookService } from "../book.service";

import { createBookObject } from "../utils";

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
  wikiVisible: boolean = false;
  goodreadsVisible: boolean = false;

  //WIKI HAS NO TITLES, MAKE IT SOMEWHAT READABLE
  periods: number[];

  //IS THE DATA LOADING?
  dataLoading: boolean = true;

  // @Input() book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  // initialize() {
  //   var viewer = new google.books.DefaultViewer(
  //     document.getElementById("viewerCanvas")
  //   );
  //   viewer.load("ISBN:0738531367");
  // }

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

  getBook(): void {
    var bookPath = this.route.snapshot.url[1].path;
    this.bookService.getBook(bookPath).subscribe(
      data => {
        this.book = createBookObject(data);
        this.periods = data["periods"];
        this.isDataAvailable = true;
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
