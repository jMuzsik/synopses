var apiCalls = require("./api-calls/index");

function getAllTheData(title, author, finalCallback) {
  var allTheData = {
    front_cover: String,
    amazon_reviews: Array,
    amazon_editorial_review: String,
    amazon_similar_products: Array,
    goodreads_description: String,
    goodreads_reviews_widget: String,
    goodreads_author_image: String,
    goodreads_author_link: String,
    goodreads_similar_books: Array,
    penguin_data: Array,
    author_name: String,
    isbn: String,
    wikipedia_text: String,
    title: String
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
      if (isbnData.exact_title === "failed") {
        return;
      } else {
        return apiCalls.getAmazonData(allTheData.isbn);
      }
    })
    .then(function(amazonData) {
      if (amazonData !== undefined) {
        allTheData.amazon_reviews = amazonData.amazon_reviews;
        allTheData.amazon_editorial_review = amazonData.amazon_editorial_review;
        allTheData.amazon_similar_products = amazonData.amazon_similar_products;
        return apiCalls.getPenguinData(allTheData.exact_title);
      }
    })
    .then(function(penguinData) {
      if (penguinData !== undefined) {
        allTheData.penguin_data = penguinData;
        //CALLBACKS....SO MANY CALLBACKS, PROMISES NOT ALLOWED
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
              allTheData.goodreads_similar_books =
                goodreadsData.goodreads_similar_books;

              apiCalls.getWikiData(allTheData.author_name, function(wikiData) {
                allTheData.wikipedia_text = wikiData;
                finalCallback(allTheData);
                return;
              });
            });
          }
        );
      } else {
        finalCallback("failed");
        return;
      }
    })
    .catch(function(err) {
      console.log("FUNDAMENTAL ERROR IN GETTING DATA", err);
      finalCallback(allTheData);
      return;
    });
}

module.exports = getAllTheData;
