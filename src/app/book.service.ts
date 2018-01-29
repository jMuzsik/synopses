import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Book } from "./book";

import { Http } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import {
  makeWikiTextPresentable,
  fixGoodreadsDescription,
  capitalizeFirstLetter
} from "./utils";

@Injectable()
export class BookService {
  constructor(private http: Http) {}

  getBook(bookPath: string) {
    console.log("do i ever fucking get in here????");
    return this.http.get(`/api/${bookPath}`).map(res => {
      //THIS IS WHAT IS RETURNED, ODDLY _BODY AND AM ARRAY THAT I HAVE TO GRAB FIRST IDX OF
      res = res.json();
      console.log(res)

      //TAKE CARE OF CONFUSION WITHIN WIKI TEXT, PERIOD PROPERTY SO AS TO BOLD FIRST SENTENCE OF EACH PARAGRAPH
      var storeWikiFuncResultsArr = makeWikiTextPresentable(
        res["wikipedia_text"]
      );
      console.log(storeWikiFuncResultsArr)
      res["wikipedia_text"] = storeWikiFuncResultsArr[0];
      res["periods"] = storeWikiFuncResultsArr[1];

      //INPUT LOWERCASE LETTERS, MAKE FIRST LETTER UPPERCASE
      res["bookTitle"] = capitalizeFirstLetter(res["title"]);

      //GET RIDE OF <i> TAGS WITHIN GOODREADS DESCRIPTION AS THEY DO NOT TURN INTO HTML
      console.log(res)
      res["goodreads_description"] = fixGoodreadsDescription(
        res["goodreads_description"]
      );
      console.log(res, "??????");
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
