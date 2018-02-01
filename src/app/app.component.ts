import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Router } from "@angular/router";

interface paper {
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

  papers: Array<any> = [];

  showPaper: boolean = false;

  constructor(private router: Router) {}

  lotsOfPaper(): void {
    const paper: string = "assets/falling-paper.png";
    for (let i = 0; i < 20; i++) {
      this.papers[i] = {};
      this.papers[i]["str"] = paper;
      this.papers[i]["cl"] = "paper" + " " + "paper" + (i + 1);
    }
    this.showPaper = true;
    setTimeout(() => {
      this.hideThePaper();
    }, 20000);
  }

  hideThePaper(): void {
    this.showPaper = false;
  }

  goToHome(): void {
    this.router.navigate([`/dashboard`]);
  }

  postOpen(): void {
    if (this.newBook) {
      this.newBook = false;
    } else {
      this.lotsOfPaper();
      this.newBook = true;
    }
  }
}
