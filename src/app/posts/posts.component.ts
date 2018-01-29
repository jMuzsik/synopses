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

  constructor(private http: HttpClient, public router: Router) {}

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
    this.http.post("/api", data, {}).subscribe(
      result => {
        console.log("OH YES API ALL FINISHED:", result);
      },
      error => {
        console.log("POST ERROR!!", error);
      },
      () => {
        const urlTitle: string = data.title.split(" ").join("_");
        setTimeout(() => {
          this.router.navigate([`/book/${urlTitle}`]);
        }, 5000);
      }
    );
  }
}
