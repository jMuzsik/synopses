import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Router } from "@angular/router";

import { BookService } from "./book.service";

// declare const gapi: any;

interface paper {
  cl: String;
  str: String;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  newBook: boolean = false;

  papers: Array<any> = [];

  showPaper: boolean = false;

  constructor(private router: Router) {}

  lotsOfPaper(): void {
    const paper: string = "assets/falling-paper.png";
    if (this.showPaper) {
      this.showPaper = false;
    } else {
      for (let i = 0; i < 20; i++) {
        this.papers[i] = {};
        this.papers[i]["str"] = paper;
        this.papers[i]["cl"] = "paper" + " " + "paper" + (i + 1);
      }
      this.showPaper = true;
    }
  }

  goToHome(): void {
    this.router.navigate([`/dashboard`]);
  }

  postOpen(): void {
    if (this.newBook) {
      this.newBook = false;
    } else {
      this.newBook = true;
    }
  }

  onSubmission(closePost: boolean): void {
    this.newBook = closePost;
  }
}
