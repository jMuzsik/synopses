import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Book } from "./book";

import { Http } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import {
  makeWikiTextPresentable,
  fixTextContainingBrAndITags,
  capitalizeFirstLetter,
  grabIframe
} from "./utils";

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

      //GET RIDE OF <i> TAGS WITHIN GOODREADS DESCRIPTION AS THEY DO NOT TURN INTO HTML
      res["goodreads_description"] = fixTextContainingBrAndITags(
        res["goodreads_description"]
      );
      res["amazon_editorial_review"] = fixTextContainingBrAndITags(
        res["amazon_editorial_review"]
      );
      res["goodreads_reviews_widget"] = grabIframe(
        res["goodreads_reviews_widget"]
      );
      console.log(res["goodreads_reviews_widget"])
      return res;
    });
  }

  // private handleError<T>(operation = "operation", result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
