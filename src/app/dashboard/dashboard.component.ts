import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BookService } from "../book.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  //LOAD PAGE?
  dataAvailable: boolean = false;

  //ALL BOOKS
  books: any;

  constructor(public bookService: BookService, private router: Router) {}

  getBooks(): any {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
        this.dataAvailable = true;
      },
      err => console.log("FAILED OBTAINING ALL BOOKS FROM API", err),
      () => console.log("SUCCESS!!!!")
    );
  }

  reroute(data): void {
    this.router.navigate([`/book/${data[0]}`]);
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
