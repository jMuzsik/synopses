var request = require('request');

var getPenguinData = function(query) {

  query = query.split().join('+');
  var options = {
    uri: `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${query}&api_key=${process.env.PENGUIN_API_KEY}`
  };

  request.get(options, (error, response, body) => {
    if (error) console.error(error)
    else {
      console.log('DESCRIPTION')
      console.dir(JSON.parse(response.body).data.results[0].description[0])
      console.log('TITLE')
      console.dir(JSON.parse(response.body).data.results[0].url.split('/').slice(-1)[0])
    }
  });

}
module.exports = getPenguinData;
