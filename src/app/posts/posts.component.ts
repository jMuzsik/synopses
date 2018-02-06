import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BookService } from "../book.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent {
  @Output() onSubmission = new EventEmitter<boolean>();

  submitted: boolean = false;

  bookPreviouslyCreated: boolean = false;

  loading: boolean = false;

  notPressed: boolean = true;

  constructor(
    private http: HttpClient,
    public router: Router,
    public bookService: BookService
  ) {}

  close(): void {
    if (this.bookPreviouslyCreated) {
      this.bookPreviouslyCreated = false;
    }
  }

  show(): void {
    if (this.loading) {
      this.loading = false;
    } else {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 9000);
      setTimeout(() => {
        this.router.navigateByUrl(`/book/`);
      }, 10500);
    }
  }

  newBook(title, author): void {
    class ObjectConstructor {
      title: String;
      author: String;
    }

    const data: ObjectConstructor = new ObjectConstructor();

    data.title = title.value;
    data.author = author.value;

    setTimeout(() => {
      this.onSubmission.emit(false);
      this.loading = true;
    }, 3000);

    this.bookService.postBook(data).subscribe(
      result => {
        if (result["_body"].length > 0) {
          data.title = data.title.toLowerCase();
          data.author = data.author.toLowerCase();
          let urlTitle: string =
            data.title.split(" ").join("_") +
            "_" +
            data.author.split(" ").join("_");
          if (urlTitle[urlTitle.length - 1] === "_") {
            urlTitle = urlTitle.slice(0, urlTitle.length - 1);
          }
          setTimeout(() => {
            this.loading = false;
            this.router.navigate([`/book/${urlTitle}`]);
          }, 6000);
        } else {
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

  buttonPressed(): void {
    this.notPressed = false;
  }
}
