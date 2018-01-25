var request = require('request');

var getPenguinData = function (query, callback) {

  //The query necessitates + btw words!
  query = query.split().join('+');

  var options = {
    uri: `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${query}&api_key=${process.env.PENGUIN_API_KEY}`
  };

  return request.get(options, (error, response, body) => {
    if (error) console.error(error)
    else {
      //REFORMAT TO JSON
      response = JSON.parse(response.body);
      //This is an assortment of objects that are related to what is searched, one of them is likely what is being looked for but it is difficult to get it exactly!

      // //DESCRIPTION
      // console.dir(JSON.parse(response.body).data.results[0].description[0])
      // //TITLE
      // console.dir(JSON.parse(response.body).data.results[0].url.split('/').slice(-1)[0])
      callback(response.data.results);
    }
  });

}
module.exports = getPenguinData;
