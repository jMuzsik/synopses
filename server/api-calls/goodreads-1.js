var parseString = require("xml2js").parseString;
var request = require("request-promise");

var getGoodreadsData1 = function(query, callback) {
  //www.goodreads.com/book/title.xml?author=Arthur+Conan+Doyle&key=evdOKu9Llw81A2O1l29Q&title=Hound+of+the+Baskervilles]

  var options = {
    uri: `https://www.goodreads.com/search/index.xml?q=${query}&key=${
      process.env.GOODREADS_KEY
    }`
  };

  //NEED TO FIRST F IND BOOK BY USING THE ISBN
  request(options)
    .then(function(data) {
      var xml = data;

      parseString(xml, { trim: true, async: true }, (err, result) => {
        if (err) {
          console.log('GOODREADS PARSING ERROR', err);
          callback(secondOptionsError);
          return;
        }
        if (result.GoodreadsResponse.search[0].results[0].work.length === 0) {
          callback(secondOptionsError);
          return;
        }

        var secondQuery = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].title[0]
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
          .split(" ")
          .join("+");

        var secondOptions = {
          uri: `https://www.goodreads.com/book/title.xml?title=${secondQuery}&key=${
            process.env.GOODREADS_KEY
          }`
        };
        parseString.secondOptions = secondOptions;
        callback(secondOptions);
        return;
      });
    })
    .catch(function(err) {
      console.log('GOODREADS QUERY ERROR', err);
      callback(secondOptionsError);
      return;
    });
};

module.exports = getGoodreadsData1;
