import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

  constructor(public bookService: BookService, private router: Router) {}

  getBooks(): any {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
      },
      err => console.log("FAILED OBTAINING ALL BOOKS FROM API", err),
      () => console.log("success")
    );
  }

  reroute(data): void {
    this.router.navigate([`/book/${data[0]}`]);
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.books);
  }

  filterItem(value: string): void {
    if (!value) this.filteredItems = [];
    else {
      //when nothing has typed
      const temp: any = Object.assign([], this.books).filter(book => {
        console.log(book.exact_title)
        return book.exact_title.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
      if (temp.length >= 1) {
        this.filteredItems = temp;
      }
    }
  }

  ngOnInit(): void {
    this.getBooks();
    setTimeout(() => {
      this.showDiv = false;
      this.dataAvailable = true;
      console.log(this.dataAvailable);
    }, 5800);
  }
}
