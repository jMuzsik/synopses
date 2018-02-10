import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Router } from "@angular/router";

import { BookService } from "./book.service";

import {createPaperAnimationData } from './utils';

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
    if (this.showPaper) {
      this.showPaper = false;
    } else {
      this.papers = createPaperAnimationData();
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

  //CLOSE THE POST MODULE AFTER USER POSTS A BOOK
  onSubmission(closePost: boolean): void {
    this.newBook = closePost;
  }
}
