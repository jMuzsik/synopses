import { Book } from "./book";
import { Observable } from "rxjs/Observable";

//ALL I AM GIVEN IS A BUNCH OF UNFORMATTED TEXT, BOLD FIRST SENTENCE OF EACH PARAGRAPH AND SEPARATE SECTIONS TO PUT <BR /> IN CORRECT PLACES
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

export function createBookObject(data: Object): Book {
  const book = new Book();

  console.log(data);
  //SET ALL THE FIELDS OF BOOK
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
  book["date"] = data["created_at"];
  book["updated"] = data["updated_at"];

  return book;
}

//GOODREADS IFRAME IS IN CONVOLUTED OBJECT
export function grabIframe(str: string): string {
  if (str.split('src="').length > 1) {
    const splitWhereSrcIs: Array<string> = str.split('src="');
    const idxOfEndOfHref: number = splitWhereSrcIs[1].indexOf('"');
    const iFrame: string = splitWhereSrcIs[1].slice(0, idxOfEndOfHref);
    return iFrame;
  }
  return str;
}

//LINKS WITHIN SIMILAR BOOKS SO THAT IT HAS SOME SORT OF USE
export function alterASINtoHREF(arr: Array<any>): Array<any> {
  return arr.map(idxValue => {
    idxValue.ASIN[0] = `http://www.goodreads.com/book/isbn/${idxValue.ASIN[0]}`;
    return idxValue;
  });
}

export function reformatBookData(data: any): any {
  //TAKE CARE OF CONFUSION WITHIN WIKI TEXT, PERIOD PROPERTY SO AS TO BOLD FIRST SENTENCE OF EACH PARAGRAPH
  var storeWikiFuncResultsArr = makeWikiTextPresentable(data["wikipedia_text"]);

  data["wikipedia_text"] = storeWikiFuncResultsArr[0];
  data["periods"] = storeWikiFuncResultsArr[1];

  data["bookTitle"] = data["exact_title"];

  //ONLY NEED IFRAME
  data["goodreads_reviews_widget"] = grabIframe(
    data["goodreads_reviews_widget"]
  );

  data["amazon_similar_products"] = alterASINtoHREF(
    data["amazon_similar_products"]
  );
  return data;
}

//PAPER ANIMATION DATA
export function createPaperAnimationData(): any {
  const paper: string = "assets/falling-paper.png";
  const papers = [];
  for (let i = 0; i < 20; i++) {
    papers[i] = {};
    papers[i]["str"] = paper;
    papers[i]["cl"] = "paper" + " " + "paper" + (i + 1);
  }
  return papers;
}

export function createUrlToRedirect(data: any): string {
  //LOWERCASE THE TITLE AND AUTHOR
  data.title = data.title.toLowerCase();
  data.author = data.author.toLowerCase();

  //CREATE THE URL TITLE

  let urlTitle: string =
    data.title.split(" ").join("_") + "_" + data.author.split(" ").join("_");

  //GET RID OF WHITESPACE AT THE END
  if (urlTitle[urlTitle.length - 1] === "_") {
    urlTitle = urlTitle.slice(0, urlTitle.length - 1);
  }
  return urlTitle;
}

export function reformatPenguinData(data: any): string[] {
  const newData = [];
  data.forEach((data, i) => {
    newData[i] = {};
    newData[i]["description"] = [];
    //SOMETIMES 0(NO ARRAY), 1, OR 2 DESCRIPTIONS IN THE ARRAY
    if (Array.isArray(data["description"])) {
      newData[i]["description"][0] = data["description"][0];
      if (data["description"].length > 1) {
        newData[i]["description"][1] = data["description"][1];
      }
    } else {
      newData[i]["description"][0] = "No description given.";
    }
    //SIMILAR SITUATION WITH AUTHOR, NO ARRAY OR 1 WITH AUTHOR WITHIN
    if (Array.isArray(data["author"])) {
      newData[i]["author"] = data["author"][0].split("|")[1];
    }
    //EASIER ACCESS
    newData[i]["name"] = data["name"];
    //URL DOES NOT HAVE BEGINNING OF LINK, ONLY END
    newData[i]["url"] = "http://www.penguinrandomhouse.com" + data["url"];
  });
  return newData;
}

export function setUpAmazonSimilarBooks(data: any): string[] {
  const newData = [];
  data.forEach((book, i) => {
    newData[i] = {};
    newData[i]["cl"] = "amazon-link";
    newData[i]["url"] = book.ASIN[0];
    newData[i]["title"] = book.Title[0];
  });
  return newData;
}
