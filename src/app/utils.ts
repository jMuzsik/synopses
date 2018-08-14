import { Book } from "./book";

export function makeWikiTextPresentable(
  text: String
): [Array<String>, Array<Number>] {
  let periodCounter = 0;
  const periodArrayToReturn = [];
  const textToReturn = text.split("\n").filter((str, i) => {
    if (str.length > 0) {
      const period = str.indexOf(".");
      periodArrayToReturn[periodCounter] = period;
      periodCounter++;
      return str;
    }
  });
  return [textToReturn, periodArrayToReturn];
}

export function createBookObject(data: Object): Book {
  const book = new Book();

  book["author_name"] = data["author_name"];
  book["frontCover"] = data["front_cover"];
  book["authorImage"] = data["goodreads_author_image"];
  book["authorLink"] = data["goodreads_author_link"];
  book["goodreadsDescription"] = data["goodreads_description"];
  book["goodreadsReviewsWidget"] = data["goodreads_reviews_widget"];
  book["goodreadsSimilarBooks"] = data["goodreads_similar_books"];
  book["penguinData"] = data["penguin_data"];
  book["exact_title"] = data["bookTitle"];
  book["wikipedia"] = data["wikipedia_text"];
  book["isbn"] = data["isbn"];
  book["date"] = data["created_at"];
  book["updated"] = data["updated_at"];
  return book;
}

export function grabIframe(str: string): string {
  if (str.split(`src="`).length > 1) {
    const splitWhereSrcIs: Array<string> = str.split(`src="`);
    const idxOfEndOfHref: number = splitWhereSrcIs[1].indexOf(`"`);
    const iFrame: string = splitWhereSrcIs[1].slice(0, idxOfEndOfHref);
    return iFrame;
  }
  return str;
}

export function alterASINtoHREF(arr: Array<any>): Array<any> {
  return arr.map(idxValue => {
    idxValue.ASIN[0] = `http://www.goodreads.com/book/isbn/${idxValue.ASIN[0]}`;
    return idxValue;
  });
}

export function reformatBookData(data: any): any {
  const storeWikiFuncResultsArr = makeWikiTextPresentable(
    data["wikipedia_text"]
  );

  data["wikipedia_text"] = storeWikiFuncResultsArr[0];
  data["periods"] = storeWikiFuncResultsArr[1];

  data["bookTitle"] = data["exact_title"];

  data["goodreads_reviews_widget"] = grabIframe(
    data["goodreads_reviews_widget"]
  );

  return data;
}

export function createUrlToRedirect(data: any): string {
  data.title = data.title.toLowerCase();
  data.author = data.author.toLowerCase();

  let urlTitle: string =
    data.title.split(" ").join("_") + "_" + data.author.split(" ").join("_");

  if (urlTitle[urlTitle.length - 1] === "_") {
    urlTitle = urlTitle.slice(0, urlTitle.length - 1);
  }
  return urlTitle;
}

export function reformatPenguinData(data: any): string[] {
  return data.map((book, i) => {
    // null description at times
    if (!Array.isArray(book["description"])) {
      book["description"] = ["No description given."];
    }
    if (Array.isArray(book["author"])) {
      book["author"] = book["author"][0].split("|")[1];
    }
    book["url"] = "http://www.penguinrandomhouse.com" + book["url"];
    book["name"] = book["name"];
    return book;
  });
}
