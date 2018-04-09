import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BookService } from "../book.service";

import { createUrlToRedirect } from "../utils";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent {
  // to app component
  @Output() submission = new EventEmitter<boolean>();

  // has book been created yet?
  bookPreviouslyCreated = false;

  loading = false;

  // press post button
  notPressed = true;

  // post input
  author = "";
  title = "";

  constructor(
    private http: HttpClient,
    public router: Router,
    public bookService: BookService
  ) {}

  onKey(event: any) {
    if (event.target.classList[1] === "title") {
      this.title = event.target.value;
    }
    if (event.target.classList[1] === "author") {
      this.author = event.target.value;
    }
  }

  close(): void {
    this.bookPreviouslyCreated = false;
  }

  // alter state of button press
  buttonPressed(): void {
    this.notPressed = false;
  }

  // create new book
  newBook(): void {
    class ObjectConstructor {
      title: String;
      author: String;
    }

    const data: ObjectConstructor = new ObjectConstructor();
    data.title = this.title;
    data.author = this.author;
    this.title = "";
    this.author = "";

    setTimeout(() => {
      this.loading = true;
    }, 1000);

    setTimeout(() => {
      if (this.loading) {
        this.router.navigate(["/dashboard"]);
      }
    }, 8000);

    this.bookService.postBook(data).subscribe(
      result => {
        // WAIT 5 SECONDS AFTER USER INPUTS PRIOR TO LOADING CODE TO RUN
        if (result["_body"] === "saved") {
          // REDIRECT URL CREATION
          const urlTitle = createUrlToRedirect(data);
          this.loading = false;

          // EMIT FUNCTION TO ALTER STATE IN COMPONENT THAT OPENED POST COMPONENT
          this.submission.emit(false);
          // REROUTE
          this.router.navigate([`/book/${urlTitle}`]);
        } else {
          // HTML MESSAGE OF ERROR ON DISPLAY
          this.notPressed = true;
          this.loading = false;
          this.bookPreviouslyCreated = true;
        }
      },
      error => {
        console.log("FAILED POSTING THE BOOK", error);
      },
      () => {
        console.log("ALL FINISHED POSTING BOOK!");
      }
    );
  }
}
