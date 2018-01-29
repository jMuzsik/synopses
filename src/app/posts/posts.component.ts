import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent {
  submitted: boolean = false;

  constructor(private http: HttpClient, router: Router) {}

  onSubmit(): void {
    this.submitted = true;
  }

  newBook(title: any, author: any): void {
    class ObjectConstructor {
      constructor(title: String, author: String) {
        title = title;
        author = author;
      }
    }

    const data = new ObjectConstructor(title.data, author.data);
    this.http.post("/api", data, {});
  }
}
