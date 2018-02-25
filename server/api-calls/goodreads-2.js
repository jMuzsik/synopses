var parseString = require("xml2js").parseString;
var request = require("request-promise");

var getGoodreadsData2 = function(secondOptions, callback) {
  //AFTER QUERY FOR BOOK SPECIFIC DATA USING TITLE FROM ISBN QUERY

  var goodreadsData = {
    goodreads_description: "",
    goodreads_reviews_widget: "",
    goodreads_author_image: "",
    goodreads_author_link: "",
    goodreads_similar_books: [],
    author_name: ""
  };

  request(secondOptions)
    .then(function(response) {
      var xml = response;
      parseString(xml, { trim: true }, function(err, result) {
        if (err) {
          console.log("GOODREADS PARSING ERROR", err);
          callback(goodreadsData);
          return;
        }
        response = result;
        try {
          goodreadsData.goodreads_description =
            result.GoodreadsResponse.book[0].description[0];
          goodreadsData.goodreads_reviews_widget =
            result.GoodreadsResponse.book[0].reviews_widget[0];
          if (
            result.GoodreadsResponse.book[0].authors[0].author[0].image_url[0]._.indexOf(
              "nophoto"
            ) === -1
          ) {
            goodreadsData.goodreads_author_image =
              result.GoodreadsResponse.book[0].authors[0].author[0].image_url[0]._;
          } else {
            //ULTRA IMPORTANT DEFAULT SPACE IMAGE
            goodreadsData.goodreads_author_image =
              "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png";
          }
          goodreadsData.author_name =
            result.GoodreadsResponse.book[0].authors[0].author[0].name[0];
          goodreadsData.goodreads_author_link =
            result.GoodreadsResponse.book[0].authors[0].author[0].link[0];
          goodreadsData.goodreads_similar_books =
            result.GoodreadsResponse.book[0].similar_books[0].book;
          callback(goodreadsData);
          return;
        } catch (e) {
          if (e) console.log("GOODREADS DATA GRABBING ERROR", e);
          callback(goodreadsData);
          return;
        }
      });
    })
    .catch(function(err) {
      console.log("ERROR QUERYING GOODREADS API", err);
      callback(goodreadsData);
      return;
    });
};

module.exports = getGoodreadsData2;
