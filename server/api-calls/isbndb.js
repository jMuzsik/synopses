const request = require('request');


//This ought to be called again if one thing I am searching for does not contain the information I need. A max of 3 times or so.
export const getISBN = (query) => {

  const options = {
    uri: `http://api.isbndb.com/books${query}`,
    headers: {
      'x-api-key': process.env.ISBNDB_KEY,
    }
  };

  request.get(options, (error, response, body) => {
    if (error) console.error(error)
    else {
      const isbn = response.body.books[0].isbn;
      return isbn;
    }
  })

}
