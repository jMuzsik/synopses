import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Book } from "./book";

import { Http } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import {
  makeWikiTextPresentable,
  alterAuthorAndUrl,
  capitalizeFirstLetter,
  grabIframe,
  alterASINtoHREF
} from "./utils";
import { Response } from "@angular/http/src/static_response";

@Injectable()
export class BookService {
  constructor(private http: Http) {}

  getBook(bookPath: string) {
    return this.http.get(`/api/${bookPath}`).map(res => {
      //RETURNS MULTIPLE IF THERE ARE FOR THE BOOK, I NEED TO MAKE SURE THAT SAME BOOK CANNOT BE CREATED
      res = res.json()[0];

      //TAKE CARE OF CONFUSION WITHIN WIKI TEXT, PERIOD PROPERTY SO AS TO BOLD FIRST SENTENCE OF EACH PARAGRAPH
      var storeWikiFuncResultsArr = makeWikiTextPresentable(
        res["wikipedia_text"]
      );

      res["wikipedia_text"] = storeWikiFuncResultsArr[0];
      res["periods"] = storeWikiFuncResultsArr[1];

      //INPUT LOWERCASE LETTERS, MAKE FIRST LETTER UPPERCASE
      res["bookTitle"] = capitalizeFirstLetter(res["title"]);

      //ONLY NEED IFRAME
      res["goodreads_reviews_widget"] = grabIframe(
        res["goodreads_reviews_widget"]
      );

      res["amazon_similar_products"] = alterASINtoHREF(
        res["amazon_similar_products"]
      );

      res["penguin_data"] = alterAuthorAndUrl(res["penguin_data"]);

      return res;
    });
  }

  getBooks(): Observable<Response> {
    return this.http.get("/api").map(res => {
      const convertToJSON: Response = res.json();
      return convertToJSON;
    });
  }
}
