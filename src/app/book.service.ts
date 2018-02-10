import { NgModule } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Book } from "./book";

import { Http } from "@angular/http";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";


import {
  makeWikiTextPresentable,
  grabIframe,
  alterASINtoHREF,
  reformatBookData
} from "./utils";

import { Response } from "@angular/http/src/static_response";

@Injectable()
export class BookService {
  constructor(private http: Http) {}

  getBook(bookPath: string) {
    return this.http.get(`/api/${bookPath}`).map(res => {
      //RETURNS MULTIPLE IF THERE ARE FOR THE BOOK, I NEED TO MAKE SURE THAT SAME BOOK CANNOT BE CREATED
      res = res.json()[0];
      console.log(res);
      //REFORMAT CERTAIN CONFUSING ELEMENTS OF THE DATA
      res = reformatBookData(res);
      return res;
    });
  }

  getBooks(): Observable<Response> {
    return this.http.get("/api").map(res => {
      const convertToJSON: any = res.json();
      return convertToJSON;
    });
  }

  putBook(bookPath: string, data: any): Observable<Response> {
    return this.http.put(`/api/${bookPath}`, data, {}).map(res => {
      res = res.json()[0];
      return res;
    });
  }

  postBook(data: any): Observable<Response> {
    return this.http.post("/api", data, {});
  }
}
