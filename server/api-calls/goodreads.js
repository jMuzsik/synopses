var parseString = require('xml2js').parseString;
var request = require('request');

var getGoodreadsData = function (query, callback) {
  https://www.goodreads.com/book/title.xml?author=Arthur+Conan+Doyle&key=evdOKu9Llw81A2O1l29Q&title=Hound+of+the+Baskervilles]
  query = query.split().join('+');

  var options = {
    uri: `https://www.goodreads.com/book/title.xml?title=${query}&key=${process.env.GOODREADS_KEY}`
  };

  return request.get(options, (error, response, body) => {

    var goodreadsData = {
      goodreads_description: "",
      goodreads_reviews_widget: "",
      goodreads_author_image: "",
      goodreads_author_link: "",
      goodreads_similar_books: [],
      author_name: ""
    }

    if (error) console.error("THIS IS GOODREADS API ERROR:", error);
    else {
      var xml = response.body;
      parseString(xml, { trim: true }, (err, result) => {
        if (err) console.log(err)
        goodreadsData.goodreads_description = result.GoodreadsResponse.book[0].description[0];
        goodreadsData.goodreads_reviews_widget = result.GoodreadsResponse.book[0].reviews_widget[0];
        goodreadsData.goodreads_author_image = result.GoodreadsResponse.book[0].authors[0].author[0].image_url[0]._;
        goodreadsData.author_name = result.GoodreadsResponse.book[0].authors[0].author[0].name[0];
        goodreadsData.goodreads_author_link = result.GoodreadsResponse.book[0].authors[0].author[0].link[0];
        goodreadsData.goodreads_similar_books = result.GoodreadsResponse.book[0].similar_books[0].book;
        // //EQUATES TO A LARGE ARRAY OF OBJECTS WITH DIFERENT BOOKS within each:
        // console.log("BOOK TITLE")
        // console.dir(result.GoodreadsResponse.book[0].similar_books[0].book[0].title[0])
        // console.log("BOOK LINK")
        // console.dir(result.GoodreadsResponse.book[0].similar_books[0].book[0].link[0])
        // console.log("BOOK IMAGE")
        // console.dir(result.GoodreadsResponse.book[0].similar_books[0].book[0].image_url[0])
        callback(goodreadsData);
      })
    }
  })
};

module.exports = getGoodreadsData;
