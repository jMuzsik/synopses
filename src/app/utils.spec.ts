import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";

import { MockBooks } from "./book.service.mock";

import * as utils from "./utils";

describe("Utils function file", () => {
  let data: any;
  let book: any;
  let result: any;

  beforeEach(() => {
    data = MockBooks;
  });

  it("makeWikiPresentable function should do exactly what it is supposed to do", () => {
    book = data[0];
    //REGULAR TIME WHEN THERE IS GUARANTEED TO BE A PERIOD AND A NEW LINE
    result = utils.makeWikiTextPresentable(book["wikipedia_text"]);
    expect(result[0].length).toBe(result[1].length);
    //NO PERIODS OR NEW LINES
    book["wikipedia_text"] = "this is a string of stuff";
    result = utils.makeWikiTextPresentable(book["wikipedia_text"]);
    expect(result[0][0]).toBe("this is a string of stuff");
    expect(result[1][0]).toBe(-1);
    //PERIODS, NO NEW LINE
    book["wikipedia_text"] = "this is a string of stuff.";
    result = utils.makeWikiTextPresentable(book["wikipedia_text"]);
    expect(result[0][0]).toBe("this is a string of stuff.");
    expect(result[1][0]).toBe(result[0][0].length - 1);
    //NEW LINE, NO PERIODS
    book["wikipedia_text"] = `this is a string of stuff.

        `;
    result = utils.makeWikiTextPresentable(book["wikipedia_text"]);
    expect(result[0][0]).toBe("this is a string of stuff.");
    //WHERE PERIOD IS LOCATED
    expect(result[1][0]).toBe(result[0][0].length - 1);
  });

  it("grabIframe should do just as it says", () => {
    book = MockBooks[0];
    result = utils.grabIframe(book["goodreads_reviews_widget"]);
    expect(result.slice(0, 5)).toBe("https");
    //IF NO IFRAME EXISTS RETURN THE SAME STRING BACK
    result = utils.grabIframe("this is not an iframe");
    expect(result).toBe("this is not an iframe");
  });

  it("alterASINtoHREF should do just as it says", () => {
    book = MockBooks[0];
    expect(book["amazon_similar_products"][0].ASIN[0]).toBe("0143039075");
    result = utils.alterASINtoHREF(book["amazon_similar_products"]);
    expect(result[0].ASIN[0].slice(0, 4)).toBe("http");
    expect(result[0].ASIN[0].slice(result[0].ASIN[0].length - 10)).toBe(
      "0143039075"
    );
  });

  it("createUrlToRedirect should do just as it says", () => {
    let data: any = {};
    data.title = 'this is a title';
    data.author = 'some guy';
    expect(utils.createUrlToRedirect(data)).toBe("this_is_a_title_some_guy");
    //GETS RID OF WHITESPACE AT END
    data.author = 'some guy ';
    expect(utils.createUrlToRedirect(data)).toBe("this_is_a_title_some_guy");
    //IF RANDOM SPACES, JUST MORE _ THINGS, WHATEVER
    data.author = ' dis   a   guy    ';
    expect(utils.createUrlToRedirect(data)).toBe("this_is_a_title__dis___a___guy___");
  });

  it("reformatPenguinData should do just as it says", () => {
    book = MockBooks[0];;
    // "231142|J. M. Coetzee" -> J. M. Coetzee
    // /books/297589/disgrace-by-j-m-coetzee' -> http://www.penguinrandomhouse.com/books/297589/disgrace-by-j-m-coetzee
    result = utils.reformatPenguinData(book["penguin_data"]);
    console.log(result)
    expect()
  });
});
