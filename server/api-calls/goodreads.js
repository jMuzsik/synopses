var parseString = require('xml2js').parseString;
var request = require('request');

var getGoodreadsData = function(isbn) {

  var options = {
    uri: `https://www.goodreads.com/book/isbn/${isbn}?key=${process.env.GOODREADS_KEY}`
  };

  request.get(options, (error, response, body) => {
    if (error) console.error(error);
    else {
      var xml = response.body;
      parseString(xml, {trim: true}, (err, result) => {
        if(err) console.log(err)
        console.log("Librarian Description")
        console.dir(result.GoodreadsResponse.book[0].description[0])
        console.log("Reviews Widget")
        console.dir(result.GoodreadsResponse.book[0].reviews_widget[0])
        console.log("AUTHOR IMAGE") //sorry if more then 1...
        console.dir(result.GoodreadsResponse.book[0].authors[0].author[0].image_url[0]._[0])
        console.log("AUTHOR NAME") //sorry if more then 1...
        console.dir(result.GoodreadsResponse.book[0].authors[0].author[0].name[0])
        console.log("AUTHOR LINK") //sorry if more then 1...
        console.dir(result.GoodreadsResponse.book[0].authors[0].author[0].link)
        console.log("SIMILAR BOOKS")
        console.dir(result.GoodreadsResponse.book[0].similar_books[0].book)
        // //EQUATES TO A LARGE ARRAY OF OBJECTS WITH DIFERENT BOOKS within each:
        console.log("BOOK TITLE")
        console.dir(result.GoodreadsResponse.book[0].similar_books[0].book[0].title[0])
        console.log("BOOK LINK")
        console.dir(result.GoodreadsResponse.book[0].similar_books[0].book[0].link[0])
        console.log("BOOK IMAGE")
        console.dir(result.GoodreadsResponse.book[0].similar_books[0].book[0].image_url[0])
      })
    }
  })
};

var get

module.exports = getGoodreadsData;
