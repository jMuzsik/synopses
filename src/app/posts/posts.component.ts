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
    this.bookPreviouslyCreated = false;
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

    setTimeout(() => {
      this.loading = true;
    }, 1000);

    console.log('what is this, no post???', data)

    this.bookService.postBook(data).subscribe(
      result => {
        //WAIT 5 SECONDS AFTER USER INPUTS PRIOR TO LOADING CODE TO RUN
        if (result["_body"] === "saved") {
          //REDIRECT URL CREATION
          const urlTitle = createUrlToRedirect(data);
          this.loading = false;

          //EMIT FUNCTION TO ALTER STATE IN COMPONENT THAT OPENED POST COMPONENT
          this.onSubmission.emit(false);
          //REROUTE
          this.router.navigate([`/book/${urlTitle}`]);
        } else {
          //HTML MESSAGE OF ERROR ON DISPLAY
          this.notPressed = true;
          this.loading = false;
          this.bookPreviouslyCreated = true;
        }
      },
      error => {
        console.log('FAILED POSTING THE BOOK', error);
      },
      () => {
        console.log("ALL FINISHED POSTING BOOK!");
      }
    );
  }
}
