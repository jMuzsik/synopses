import { Book } from "./book";
import { Observable } from "rxjs/Observable";

export function makeWikiTextPresentable(
  text: String
): [Array<String>, Array<Number>] {
  var periodCounter = 0;
  var periodArrayToReturn = [];
  var textToReturn = text.split("\n").filter((str, i) => {
    if (str.length > 0) {
      let period = str.indexOf(".");
      periodArrayToReturn[periodCounter] = period;
      periodCounter++;
      return str;
    }
  });
  return [textToReturn, periodArrayToReturn];
}

export function fixTextContainingBrAndITags(text: String): String[] {
  //AMAZON TEXT CONTAINS BR AND I
  if (text.indexOf("<BR>") > -1) {
    return text
      .split("<BR><BR>")
      .filter(str => str)
      .map((str, i) => {
        str = str.replace(/<I>/g, "");
        str = str.replace(/<\/I>/g, "");
        return str;
      });
    //GOODREADS TEXT CONTAINS br (lowercase) AND i
  } else {
    return text
      .split("<br /><br />")
      .filter(str => str)
      .map((str, i) => {
        str = str.replace(/<i>/g, "");
        str = str.replace(/<\/i>/g, "");
        return str;
      });
  }
}

export function createBookObject(data: Object): Book {
  const book = new Book();

  //SET ALL THE FIELDS OF BOOK
  console.log(data)

  book["amazonReview"] = data["amazon_editorial_review"];
  //IFRAME IS LOCATED WITHIN ARRAY
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

  return book;
}

export function capitalizeFirstLetter(str: string): string {
  return str
    .split(" ")
    .map(subStr => subStr.charAt(0).toUpperCase() + subStr.slice(1))
    .join(" ");
}

export function grabIframe(str: string): string {
  if(str.split('src="').length > 1) {
    const splitWhereSrcIs: Array<string> = str.split('src="');
    const idxOfEndOfHref: number = splitWhereSrcIs[1].indexOf('"');
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

export function alterAuthorAndUrl(arr: Array<any>): Array<any> {
 return arr.map(data => {
    if(data.author) {
      if(data.author[0].indexOf('|') > -1) {
        const idxToSlice = data.author[0].indexOf("|") + 1;
        data.author[0] = data.author[0].slice(idxToSlice);
      }
    }
    data.url = "https://www.penguinrandomhouse.com" + data.url;
    return data;
  });
}
