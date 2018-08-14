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
export class PostsComponent implements OnInit {
  @Output() submission = new EventEmitter<boolean>();

  bookPreviouslyCreated = false;

  loading = false;

  notPressed = true;

  author = "";
  title = "";

  constructor(
    private http: HttpClient,
    public router: Router,
    public bookService: BookService
  ) {}

  onInput(event: any) {
    if (event.target.classList[0] === "title-input") {
      this.title = event.target.value;
    }
    if (event.target.classList[0] === "author-input") {
      this.author = event.target.value;
    }
  }

  close(): void {
    this.bookPreviouslyCreated = false;
  }

  buttonPressed(): void {
    this.notPressed = false;
  }

  newBook(event): void {
    class ObjectConstructor {
      title: String;
      author: String;
    }
    const data: ObjectConstructor = new ObjectConstructor();
    data.title = this.title;
    data.author = this.author;
    this.title = "";
    this.author = "";

    // close modal
    $("#postModal").modal("hide");

    setTimeout(() => {
      this.loading = true;
      // temp fix
      this.router.navigate(["/"]);
    }, 1000);
    setTimeout(() => {
      if (this.loading) {
        this.router.navigate(["/"]);
      }
    }, 8000);

    this.bookService.postBook(data).subscribe(
      result => {
        if (result["_body"] === "saved") {
          const urlTitle = createUrlToRedirect(data);
          this.loading = false;

          this.submission.emit(false);
          this.router.navigate([`/book/${urlTitle}`]);
        } else {
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

  ngOnInit() {
    const options = {
      keyboard: true,
      focus: true,
    };
    $("#postModal").modal(options);
  }
}
