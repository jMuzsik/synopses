import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Fuse from "fuse.js";

import { BookService } from "../book.service";

import { MockBooks } from "../book.service.mock";
import { Mock } from "protractor/built/driverProviders";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // LOAD PAGE?
  dataAvailable = false;
  showDiv = false;

  // ALL BOOKS
  books: any = [];

  filteredItems: any = [];

  // LIBRARY THAT DOES FUZZY SEARCH(fuse.js) DEFAULT VALUES
  fuseOptions: any = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["exact_title", "author_name"],
  };

  constructor(public bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  // WHEN CLICK IMAGE IN SEARCH REROUTE
  reroute(data): void {
    this.router.navigate([`/book/${data}`]);
  }

  // SEARCH RESULTS(FILTER RESULTS)
  filterItem(value: string): void {
    if (!value) {
      this.filteredItems = [];
    } else {
      const fuse: any = new Fuse(this.books, this.fuseOptions);
      const result: any = fuse.search(value);
      const filteredResult: any = result.map(book => this.checkForImage(book));
      this.fillOutGrid(filteredResult);
    }
  }

  // IF BOOK HAS NO IMAGE, SOME REASON, GIVE SPACE IMAGE
  checkForImage(book: any): void {
    if (book.front_cover) {
      return book;
    } else {
      book.front_cover =
        "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png";
      return book;
    }
  }

  // USING CSS GRID
  fillOutGrid(result: any): void {
    // if 1 item it is in the center
    // if 2 items they are at 1 and 3
    // if 3 items they are at 1,2,3
    // if 4 items then do not display 4, same as 3
    // if 5 display all

    this.filteredItems = [0, 0, 0, 0, 0];
    if (result.length === 1) {
      this.filteredItems[2] = result[0];
    } else if (result.length === 2) {
      this.filteredItems[1] = result[0];
      this.filteredItems[2] = result[1];
    } else if (result.length === 3 || result.length === 4) {
      this.filteredItems[2] = result[0];
      this.filteredItems[1] = result[1];
      this.filteredItems[3] = result[2];
    } else if (result.length >= 5) {
      this.filteredItems[0] = result[0];
      this.filteredItems[1] = result[1];
      this.filteredItems[2] = result[2];
      this.filteredItems[3] = result[3];
      this.filteredItems[4] = result[4];
    }
  }

  // GET ALL THE BOOKS
  getBooks(): any {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
      },
      err => console.log("FAILED OBTAINING ALL BOOKS FROM API", err),
      () => (this.dataAvailable = true)
    );
  }
}
