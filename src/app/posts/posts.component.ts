import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BookService } from "../book.service";

import { createUrlToRedirect } from "../utils";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent {
  //EMIT EVENT TO AFFECT STATE IN APP COMPONENT
  @Output() onSubmission = new EventEmitter<boolean>();

  //HAS BOOK BEEN CREATED YET?
  bookPreviouslyCreated: boolean = false;

  //LOTS OF API REQUESTS = ~20 SECOND POST REQUEST, SO INTERESTING LOADING PAGE
  loading: boolean = false;

  //HAS USER PRESSED POST BUTTON?
  notPressed: boolean = true;

  constructor(
    private http: HttpClient,
    public router: Router,
    public bookService: BookService
  ) {}

  //CHECK IF BOOK BEING CREATED ALREADY HAS BEEN CREATED
  close(): void {
    if (this.bookPreviouslyCreated) {
      this.bookPreviouslyCreated = false;
    }
  }

  //ALTER STATE OF BUTTON PRESS
  buttonPressed(): void {
    this.notPressed = false;
  }

  //CREATE THE NEW BOOK
  newBook(title, author): void {
    class ObjectConstructor {
      title: String;
      author: String;
    }

    const data: ObjectConstructor = new ObjectConstructor();

    data.title = title.value;
    data.author = author.value;

    this.router.navigate([`/dashboard`]);

    //WAIT 5 SECONDS AFTER USER INPUTS PRIOR TO LOADING CODE TO RUN
    setTimeout(() => {
      this.loading = true;
    }, 5000);

    this.bookService.postBook(data).subscribe(
      result => {
        if (result["_body"].length > 0) {
          //REDIRECT URL CREATION
          const urlTitle = createUrlToRedirect(data);
          this.loading = false;

          //EMIT FUNCTION TO ALTER STATE IN COMPONENT THAT OPENED POST COMPONENT
          this.onSubmission.emit(false);
          //REROUTE
          this.router.navigate([`/book/${urlTitle}`]);
        } else {
          //HTML MESSAGE OF ERROR ON DISPLAY
          this.bookPreviouslyCreated = true;
        }
      },
      error => {
        alert("This book has already been created.");
      },
      () => {
        console.log("ALL FINISHED!");
      }
    );
  }
}
