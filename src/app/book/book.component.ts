import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Book } from "../book";

import { BookService } from "../book.service";

import { createBookObject } from "../utils";

declare let $: any;

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

  buttonVisible: boolean = false;

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

  alterView(): void {
    this.showBook = !this.showBook;
  }

  turnOff(): void {
    const keys = Object.keys(this.buttonToggle);
    this.buttonVisible = false;
    keys.forEach(key => {
      this.buttonToggle[key] = false;
    });
  }

  reformatPenguinData(data: any): string[] {
    const newData = [];
    data[0]["data"]["results"].forEach((data, i) => {
      newData[i] = {};
      newData[i]["description"] = [];
      if(Array.isArray(data["description"])) {
        newData[i]["description"][0] = data["description"][0];
        if (data["description"].length > 1) {
          newData[i]["description"][1] = data["description"][1];
        }
      } else {
        newData[i]["description"][0] = "No description given."
      }
      newData[i]["author"] = data["author"][0].split("|")[1];
      newData[i]["name"] = data["name"];
      newData[i]["url"] = "http://www.penguinrandomhouse.com" + data["url"];
    });
    return newData;
  }

  setUpAmazonSimilarBooks(data: any): string[] {
    const newData = [];
    data.forEach((book, i) => {
      newData[i] = {};
      newData[i]["cl"] = "amazon-link";
      newData[i]["url"] = book.ASIN[0];
      newData[i]["title"] = book.Title[0];
    });
    return newData;
  }

  getBook(): void {
    var bookPath = this.route.snapshot.url[1].path;
    this.bookService.getBook(bookPath).subscribe(
      data => {
        this.book = createBookObject(data);
        this.periods = data["periods"];
        this.isDataAvailable = true;
        this.book["penguinData"] = this.reformatPenguinData(
          this.book.penguinData
        );
        this.book["amazonSimilarProducts"] = this.setUpAmazonSimilarBooks(
          this.book["amazonSimilarProducts"]
        );
        console.log(this.book);
      },
      err => console.log(err),
      () => {
        console.log("SUCCESS!!!!");
      }
    );
  }

  closeModal(): void {
    this.turnOff();
  }

  ngOnInit(): void {
    this.getBook();
  }
}
