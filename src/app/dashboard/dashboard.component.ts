import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BookService } from "../book.service";
import { setTimeout } from "timers";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  //LOAD PAGE?
  dataAvailable: boolean = false;
  showDiv: boolean = true;

  //ALL BOOKS
  books: any;

  constructor(public bookService: BookService, private router: Router) {}

  getBooks(): any {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
      },
      err => console.log("FAILED OBTAINING ALL BOOKS FROM API", err),
      () => console.log('success')

    );
  }

  reroute(data): void {
    this.router.navigate([`/book/${data[0]}`]);
  }

  ngOnInit(): void {
    this.getBooks();
    setTimeout(() => {
      this.showDiv = false;
      this.dataAvailable = true;
    }, 7000)
  }
}
