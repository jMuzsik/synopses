import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BookService } from "../book.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent {
  submitted: boolean = false;

  bookPreviouslyCreated: boolean = true;

  constructor(
    private http: HttpClient,
    public router: Router,
    public bookService: BookService
  ) {}

  close(): void {
    if(this.bookPreviouslyCreated) {
      this.bookPreviouslyCreated = false;
    }
  }

  onSubmit(): void {
    this.submitted = true;
  }

  newBook(title, author): void {
    class ObjectConstructor {
      title: String;
      author: String;
    }

    const data: ObjectConstructor = new ObjectConstructor();
    data.title = title.value;
    data.author = author.value;

    this.bookService.postBook(data).subscribe(
      result => {
        if (result._body.length > 0) {
          const urlTitle: string =
            data.title.split(" ").join("_") +
            "_" +
            data.author.split(" ").join("_");
          setTimeout(() => {
            this.router.navigate([`/book/${urlTitle}`]);
          }, 10000);
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
}
