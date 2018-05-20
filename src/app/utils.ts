import { Book } from "./book";
import { Observable } from "rxjs/Observable";

// ALL I AM GIVEN IS A BUNCH OF UNFORMATTED TEXT, BOLD FIRST SENTENCE OF EACH PARAGRAPH
// AND SEPARATE SECTIONS TO PUT <BR /> IN CORRECT PLACES
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

  // SET ALL THE FIELDS OF BOOK
  book["amazonReview"] = data["amazon_editorial_review"];
  // IFRAME IS LOCATED WITHIN ARRAY
  book["amazonCustomerReviews"] = data["amazon_reviews"][0].IFrameURL[0];
  book["amazonSimilarProducts"] = data["amazon_similar_products"];
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

// GOODREADS IFRAME IS IN CONVOLUTED OBJECT
export function grabIframe(str: string): string {
  if (str.split(`src="`).length > 1) {
    const splitWhereSrcIs: Array<string> = str.split(`src="`);
    const idxOfEndOfHref: number = splitWhereSrcIs[1].indexOf(`"`);
    const iFrame: string = splitWhereSrcIs[1].slice(0, idxOfEndOfHref);
    return iFrame;
  }
  return str;
}

// LINKS WITHIN SIMILAR BOOKS SO THAT IT HAS SOME SORT OF USE
export function alterASINtoHREF(arr: Array<any>): Array<any> {
  return arr.map(idxValue => {
    idxValue.ASIN[0] = `http://www.goodreads.com/book/isbn/${idxValue.ASIN[0]}`;
    return idxValue;
  });
}

export function reformatBookData(data: any): any {
  // TAKE CARE OF CONFUSION WITHIN WIKI TEXT, PERIOD PROPERTY SO AS TO BOLD FIRST SENTENCE OF EACH PARAGRAPH
  const storeWikiFuncResultsArr = makeWikiTextPresentable(
    data["wikipedia_text"]
  );

  data["wikipedia_text"] = storeWikiFuncResultsArr[0];
  data["periods"] = storeWikiFuncResultsArr[1];

  data["bookTitle"] = data["exact_title"];

  // ONLY NEED IFRAME
  data["goodreads_reviews_widget"] = grabIframe(
    data["goodreads_reviews_widget"]
  );
  if (data["amazon_similar_products"] !== null) {
    data["amazon_similar_products"] = alterASINtoHREF(
      data["amazon_similar_products"]
    );
  }
  return data;
}

// PAPER ANIMATION DATA
export function createPaperAnimationData(): any {
  const paper = "assets/falling-paper.png";
  const papers = [];
  for (let i = 0; i < 20; i++) {
    papers[i] = {};
    papers[i]["str"] = paper;
    papers[i]["cl"] = "paper" + " " + "paper" + (i + 1);
  }
  return papers;
}

export function createUrlToRedirect(data: any): string {
  // LOWERCASE THE TITLE AND AUTHOR
  data.title = data.title.toLowerCase();
  data.author = data.author.toLowerCase();

  // CREATE THE URL TITLE
  let urlTitle: string =
    data.title.split(" ").join("_") + "_" + data.author.split(" ").join("_");

  // GET RID OF WHITESPACE AT THE END
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
    // split at the pipe
    if (Array.isArray(book["author"])) {
      book["author"] = book["author"][0].split("|")[1];
    }
    // add beginning href to url
    book["url"] = "http://www.penguinrandomhouse.com" + book["url"];
    book["name"] = book["name"];
    return book;
  });
}

export function setUpAmazonSimilarBooks(data: any): string[] {
  const newData = [];
  data.forEach((book, i) => {
    newData[i] = {};
    newData[i]["url"] = book.ASIN[0];
    newData[i]["title"] = book.Title[0];
  });
  return newData;
}
