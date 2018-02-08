import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Fuse from "fuse.js";

import { BookService } from "../book.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  //LOAD PAGE?
  dataAvailable: boolean = false;
  showDiv: boolean = false;

  //ALL BOOKS
  books: any = [];

  filteredItems: any = [];

  fuseOptions: any = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["exact_title", "author_name"]
  };

  constructor(public bookService: BookService, private router: Router) {}

  getBooks(): any {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
        this.dataAvailable = true;
      },
      err => console.log("FAILED OBTAINING ALL BOOKS FROM API", err),
      () => console.log("success")
    );
  }

  reroute(data): void {
    this.router.navigate([`/book/${data[0]}`]);
  }

  filterItem(value: string): void {
    if (!value) this.filteredItems = [];
    else {
      const fuse: any = new Fuse(this.books, this.fuseOptions);
      const result: any = fuse.search(value);
      const filteredResult: any = result.map(book => this.checkForImage(book));
      this.fillOutGrid(filteredResult);
    }
  }

  checkForImage(book: any): void {
    if (book.front_cover) return book;
    else {
      book.front_cover =
        "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png";
      return book;
    }
  }

  fillOutGrid(result: any): void {
    //if 1 item it is in the center
    //if 2 items they are at 1 and 3
    //if 3 items they are at 1,2,3
    //if 4 items then do not display
    //if 5 display
    this.filteredItems = [0, 0, 0, 0, 0];
    console.log(result, this.filteredItems)
    if (result.length === 1) {
      this.filteredItems[2] = result[0];
    } else if (result.length === 2) {
      this.filteredItems[1] = result[0];
      this.filteredItems[2] = result[1];
    } else if (result.length === 3 || result.length === 4) {
      this.filteredItems[1] = result[0];
      this.filteredItems[2] = result[1];
      this.filteredItems[3] = result[2];
    } else if (result.length >= 5) {
      this.filteredItems[0] = result[0];
      this.filteredItems[1] = result[1];
      this.filteredItems[2] = result[2];
      this.filteredItems[3] = result[3];
      this.filteredItems[4] = result[4];
    }
    console.log(this.filteredItems)
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
