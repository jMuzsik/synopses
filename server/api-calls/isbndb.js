var request = require('request');


//This ought to be called again if one thing I am searching for does not contain the information I need. A max of 3 times or so.
var getISBN = function (query, callback) {
  var options = {
    uri: `http://api.isbndb.com/books/${query}`,
    headers: {
      'x-api-key': process.env.ISBNDB_KEY,
    }
  };

  return request.get(options, (error, response, body) => {
    if (error) console.error('THIS IS AN ISBNDB ERROR:', error)
    else {
      callback(JSON.parse(response.body).books[0].isbn)
    }
  });
}
module.exports = getISBN;
