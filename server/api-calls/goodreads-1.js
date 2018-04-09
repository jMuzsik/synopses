var parseString = require("xml2js").parseString;
var request = require("request-promise");

var findDeep = require("../utils").findDeep;

var getGoodreadsData1 = function(query, backupTitle, callback) {
  var secondOptionsQuery = backupTitle
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    .split(" ")
    .slice(3)
    .join("+");

  var secondOptionsError = {
    uri: `https://www.goodreads.com/book/title.xml?title=${secondOptionsQuery}&key=${
      process.env.GOODREADS_KEY
    }`,
  };

  var options = {
    uri: `https://www.goodreads.com/search/index.xml?q=${query}&key=${
      process.env.GOODREADS_KEY
    }`,
  };

  // First find book by using ISBN
  request(options)
    .then(function(data) {
      var xml = data;

      parseString(xml, { trim: true }, (err, result) => {
        if (err) {
          console.log("GOODREADS PARSING ERROR", err);
          callback(secondOptionsError);
          return;
        }
        const findArray = findDeep(
          result,
          ["GoodreadsResponse", "search", 0, "results", 0, "work"],
          "cat",
        );
        if (findArray.length === 0) {
          callback(secondOptionsError);
          return;
        } 

        // Deeply nested data
        var secondQuery = findDeep(
          result,
          [
            "GoodreadsResponse",
            "search",
            0,
            "results",
            0,
            "work",
            0,
            "best_book",
            0,
            "title",
            0,
          ],
          false
        );
        if (secondQuery) {
          secondQuery = secondQuery
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
            .split(" ")
            .join("+");
        }

        var secondOptions = {
          uri: `https://www.goodreads.com/book/title.xml?title=${secondQuery}&key=${
            process.env.GOODREADS_KEY
          }`,
        };
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
