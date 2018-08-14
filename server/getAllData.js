const apiCalls = require("./api-calls/index");

var getRidOfExcessPenguinData = require("./utils").getRidOfExcessPenguinData;
var getRidOfExcessGoodreadsbookData = require("./utils")
  .getRidOfExcessGoodreadsbookData;

function getAllTheData(title, author, finalCallback) {
  let allTheData = {
    front_cover: String,
    goodreads_description: String,
    goodreads_reviews_widget: String,
    goodreads_author_image: String,
    goodreads_author_link: String,
    goodreads_similar_books: Array,
    penguin_data: Array,
    author_name: String,
    isbn: String,
    wikipedia_text: String,
    title: String,
  };

  allTheData.title = title.toLowerCase();
  allTheData.author = author.toLowerCase();

  // FIRST GET THE ISBN
  apiCalls
    .getISBN(allTheData.title, author)
    .then(function(isbnData) {
      allTheData.isbn = isbnData.isbn;
      allTheData.front_cover = isbnData.image;
      allTheData.exact_title = isbnData.exact_title;
      // If integral process failed, express so immidiately to front-end
      if (isbnData.exact_title === "failed") {
        throw new Error("failed");
      } else {
        return apiCalls.getPenguinData(allTheData.exact_title);
      }
    })
    .then(function(penguinData) {
      penguinData = getRidOfExcessPenguinData(penguinData);
      allTheData.penguin_data = penguinData;
      // Not simple to use promises with libraries following
      apiCalls.getGoodreadsData1(
        allTheData.isbn,
        allTheData.exact_title,
        function(option) {
          apiCalls.getGoodreadsData2(option, function(goodreadsData) {
            allTheData.goodreads_description =
              goodreadsData.goodreads_description;
            if (goodreadsData.author_name.length === 0) {
              allTheData.author_name = author;
            } else allTheData.author_name = goodreadsData.author_name;
            allTheData.goodreads_reviews_widget =
              goodreadsData.goodreads_reviews_widget;
            allTheData.goodreads_author_image =
              goodreadsData.goodreads_author_image;
            allTheData.goodreads_author_link =
              goodreadsData.goodreads_author_link;
            allTheData.goodreads_similar_books = getRidOfExcessGoodreadsbookData(
              goodreadsData.goodreads_similar_books
            );
            apiCalls.getWikiData(allTheData.author_name, function(wikiData) {
              allTheData.wikipedia_text = wikiData;
              finalCallback(allTheData);
              return;
            });
          });
        }
      );
    })
    .catch(function(err) {
      console.log("FUNDAMENTAL ERROR IN GETTING DATA", err);
      finalCallback("failed");
      return;
    });
}

module.exports = getAllTheData;
