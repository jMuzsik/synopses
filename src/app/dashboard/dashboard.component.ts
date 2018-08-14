import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Fuse from "fuse.js";

import { BookService } from "../book.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  dataAvailable = false;
  showDiv = false;

  books: any = [];

  filteredItems: any = [];

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

  reroute(data): void {
    this.router.navigate([`/book/${data}`]);
  }

  filterItem(value: string): void {
    if (!value) {
      this.filteredItems = [];
    } else {
      const fuse: any = new Fuse(this.books, this.fuseOptions);
      const result: any = fuse.search(value);
      this.fillOutGrid(result);
    }
  }

  fillOutGrid(result: any): void {
    this.filteredItems = [0, 0, 0, 0, 0, 0];
    if (result.length === 1) {
      this.filteredItems[1] = result[0];
    } else if (result.length === 2) {
      this.filteredItems[0] = result[0];
      this.filteredItems[1] = result[1];
    } else if (result.length === 3 || result.length === 4) {
      this.filteredItems[0] = result[0];
      this.filteredItems[1] = result[1];
      this.filteredItems[2] = result[2];
    } else if (result.length >= 6) {
      this.filteredItems[2] = result[0];
      this.filteredItems[0] = result[1];
      this.filteredItems[1] = result[2];
      this.filteredItems[3] = result[3];
      this.filteredItems[4] = result[4];
      this.filteredItems[5] = result[5];
    }
  }

  formatBooks(books) {
    return books.map(book => {
      if (book.goodreads_description) {
        book.goodreads_description =
          book.goodreads_description.slice(0, 300) + "...";
      }
      return book;
    });
  }

  getBooks(): any {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
        this.books = this.formatBooks(this.books);
      },
      err => console.log("FAILED OBTAINING ALL BOOKS FROM API", err),
      () => (this.dataAvailable = true)
    );
  }
}
