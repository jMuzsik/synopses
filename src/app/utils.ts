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
  if(text.indexOf('<BR>')>-1) {
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
  book["amazonReview"] = data["amazon_editorial_review"];
  book["amazonCustomerReviews"] = data["amazon_reviews"];
  book["amazonSimilarProducts"] = data["amazon_similar_products"];
  book["author"] = data["author_name"];
  book["backCover"] = data["back_cover"];
  book["frontCover"] = data["front_cover"];
  book["authorImage"] = data["goodreads_author_image"];
  book["authorLink"] = data["goodreads_author_link"];
  book["goodreadsDescription"] = data["goodreads_description"];
  book["goodreadsReviewsWidget"] = data["goodreads_reviews_widget"];
  book["goodreadsSimilarBooks"] = data["goodreads_similar_books"];
  book["penguinData"] = data["penguin_data"];
  book["title"] = data["bookTitle"];
  book["wikipedia"] = data["wikipedia_text"];

  return book;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function grabIframe (str: string): string {
  const splitWhereSrcIs: Array<string> = str.split('src="');
  const idxOfEndOfHref: number = splitWhereSrcIs[1].indexOf('"');
  console.log(splitWhereSrcIs, idxOfEndOfHref)
  const iFrame: string = splitWhereSrcIs[1].slice(0, idxOfEndOfHref);
  return iFrame;
}
