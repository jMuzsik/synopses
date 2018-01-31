import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  newBook: boolean = false;

  papers: Array<string> = [];

  lotsOfPaper(): void {
    const paper: string =
      "https://orig00.deviantart.net/1783/f/2010/026/d/f/old_piece_of_paper_by_cathusiowa.png";
    for (let i = 0; i < 20; i++) {
      this.papers[i] = paper;
    }
  }

  postOpen(): void {
    if (this.newBook) {
      this.newBook = false;
    } else {
      this.newBook = true;
    }
  }
}
