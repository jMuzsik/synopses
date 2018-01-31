import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

interface papers {
  cl: String;
  str: String;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  newBook: boolean = false;

  papers: papers = {
    cl: "",
    str: ""
  };

  lotsOfPaper(): void {
    const paper: string =
      "https://orig00.deviantart.net/1783/f/2010/026/d/f/old_piece_of_paper_by_cathusiowa.png";
    for (let i = 1; i < 21; i++) {
      this.papers["str"] = paper;
      this.papers["cl"] = "paper" + i;
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
