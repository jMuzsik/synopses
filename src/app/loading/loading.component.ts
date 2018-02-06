import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  books: Array<any> = [];

  createFlyingBooks(): void {
    const book: string =
      "http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Opened-Book-PNG-Transparent-Image-500x312.png";
    for (let i = 0; i < 20; i++) {
      this.books[i] = {};
      this.books[i]["str"] = book;
      this.books[i]["cl"] = "book" + " " + "book" + (i + 1);
    }
  }

  constructor() {}

  ngOnInit() {
    this.createFlyingBooks();
  }
}
