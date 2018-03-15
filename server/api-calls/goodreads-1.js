var parseString = require("xml2js").parseString;
var request = require("request-promise");

var getGoodreadsData1 = function(query, backupTitle, callback) {
  console.log(backupTitle)
  var secondOptionsQuery = backupTitle
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    .split(" ")
    .slice(3)
    .join("+");
  console.log(secondOptionsError)

  var secondOptionsError = {
    uri: `https://www.goodreads.com/book/title.xml?title=${secondOptionsQuery}&key=${
      process.env.GOODREADS_KEY
    }`
  };

  var options = {
    uri: `https://www.goodreads.com/search/index.xml?q=${query}&key=${
      process.env.GOODREADS_KEY
    }`
  };
  console.log(query);

  //NEED TO FIRST FIND BOOK BY USING THE ISBN
  request(options)
    .then(function(data) {
      var xml = data;

      parseString(xml, { trim: true }, (err, result) => {
        console.log(result);
        if (err) {
          console.log("GOODREADS PARSING ERROR", err);
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
        console.log(secondOptions, parseString);
        parseString.secondOptions = secondOptions;
        callback(secondOptions);
        return;
      });
    })
    .catch(function(err) {
      console.log("GOODREADS QUERY ERROR", err);
      callback(secondOptionsError);
      return;
    });
};

module.exports = getGoodreadsData1;
