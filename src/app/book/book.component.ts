import { ViewEncapsulation, Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Book } from "../book";

import { BookService } from "../book.service";

import { createBookObject, reformatPenguinData } from "../utils";

interface ToggleButton {
  wikiVisible: boolean;
  goodreadsReviewVisible: boolean;
}

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class BookComponent implements OnInit {
  book: Book;

  isDataAvailable = false;

  buttonToggle: ToggleButton = {
    wikiVisible: false,
    goodreadsReviewVisible: false,
  };

  buttonVisible = false;

  periods: number[];

  showBook = true;

  dataLoading = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  toggle(name: string): void {
    if (!this.buttonToggle[name]) {
      this.turnOff();
      this.buttonToggle[name] = true;
    } else {
      this.turnOff();
      this.buttonToggle[name] = false;
    }
  }

  toggleButton(): void {
    this.buttonVisible = true;
  }

  alterView(type): void {
    const authorInput = $(".author-input");
    const bookInput = $(".book-input");
    if (type === "author") {
      this.showBook = true;
      authorInput.prop("disabled", true);
      authorInput.css("cursor", "not-allowed");
      bookInput.prop("disabled", false);
      bookInput.css("cursor", "pointer");
    } else {
      this.showBook = false;
      bookInput.prop("disabled", true);
      bookInput.css("cursor", "not-allowed");
      authorInput.prop("disabled", false);
      authorInput.css("cursor", "pointer");
    }
  }

  closeModal(): void {
    this.turnOff();
  }

  turnOff(): void {
    const keys = Object.keys(this.buttonToggle);
    this.buttonVisible = false;
    keys.forEach(key => {
      this.buttonToggle[key] = false;
    });
  }

  getBook(): void {
    const bookPath = this.route.snapshot.url[1].path;
    this.bookService.getBook(bookPath).subscribe(
      data => {
        console.log(data);
        this.book = createBookObject(data);
        this.periods = data["periods"];
        this.book["penguinData"] = reformatPenguinData(this.book.penguinData);

        setTimeout(() => {
          const tooltips = $('[data-toggle="tooltip"]');
          const len = tooltips.length;
          tooltips.slice(2, len).tooltip();
        }, 300);
      },
      err => console.log("Error in obtaining book from data, cause: ", err),
      () => (this.isDataAvailable = true)
    );
  }
}
