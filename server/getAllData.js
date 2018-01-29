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

  allTheData.title = title;

  // FIRST GET THE ISBN
  apiCalls.getISBN(allTheData.title, author, function(isbnData) {
    allTheData.isbn = isbnData.isbn;
    allTheData.front_cover = isbnData.image;
    // THEN GET THE AMAZON DATA
    apiCalls
      .getAmazonData(allTheData.isbn)
      .then(function(amazonData) {
        allTheData.amazon_reviews = amazonData.amazon_reviews;
        allTheData.amazon_editorial_review = amazonData.amazon_editorial_review;
        allTheData.amazon_similar_products = amazonData.amazon_similar_products;
        //THEN THE GOODREADS DATA
        apiCalls.getGoodreadsData(allTheData.isbn, function(goodreadsData) {
          allTheData.goodreads_description =
            goodreadsData.goodreads_description;
          allTheData.goodreads_reviews_widget =
            goodreadsData.goodreads_reviews_widget;
          allTheData.goodreads_author_image =
            goodreadsData.goodreads_author_image;
          allTheData.author_name = goodreadsData.author_name;
          allTheData.goodreads_author_link =
            goodreadsData.goodreads_author_link;
          allTheData.goodreads_similar_books =
            goodreadsData.goodreads_similar_books;
          //PENGUIN DATA
          apiCalls.getPenguinData(allTheData.title, function(penguinData) {
            allTheData.penguin_data = penguinData;

            //WIKIPEDIA DATA
            apiCalls.getWikiData(allTheData.author_name, function(wikiData) {
              allTheData.wikipedia_text = wikiData;
              finalCallback(allTheData);
            });
          });
        });
      })
      .catch(console.error);
  });
}

module.exports = getAllTheData;
