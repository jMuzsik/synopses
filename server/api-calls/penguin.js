var request = require("request-promise");

var getPenguinData = function(query) {
  //The query necessitates + btw words!
  query = query.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
  query = query.split(" ").join("+");

  var options = {
    uri: `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${query}&api_key=${
      process.env.PENGUIN_API_KEY
    }`
  };

  return request(options)
    .then(function(data) {
      //This is an assortment of objects that are related to what is searched, one of them is likely what is being looked for but it is difficult to get it exactly!
      return JSON.parse(data);
    }).catch(function(err) {
      console.log('ERROR IN PENGUIN API REQUEST', err);
      return [];
    });
};
module.exports = getPenguinData;
