import { Component } from "@angular/core";
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Router } from "@angular/router";

import { BookService } from "./book.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  newBook = false;

  papers: Array<any> = [];

  showPaper = false;

  displayNone = false;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  goToHome(): void {
    this.router.navigate([`/`]);
  }

  postOpen(): void {
    if (this.newBook) {
      this.newBook = false;
    } else {
      this.newBook = true;
    }
  }

  submission(closePost: boolean): void {
    this.newBook = closePost;
  }
}
