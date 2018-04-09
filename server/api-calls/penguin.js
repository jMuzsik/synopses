var request = require("request-promise");

var getPenguinData = function(query) {
  //The query necessitates + btw words!
  query = query.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
  query = query.split(" ").join("+");

  var options = {
    uri: `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${query}&api_key=${
      process.env.PENGUIN_API_KEY
    }`,
  };

  return request(options)
    .then(function(data) {
      return JSON.parse(data);
    })
    .catch(function(err) {
      console.log("ERROR IN PENGUIN API REQUEST", err);
      return {
        data: {
          results: [
            {
              url: "/books/119599/a-bend-in-the-river-by-v-s-naipaul",
              name: "A bend in the River",
              author: ["71926|V. S. Naipaul"],
              description: [
                "Like many isolated people, they were wrapped up in themselves and not too interested in the world outside.",
              ],
            },
            {
              url: "/book/show/6192.Disgrace",
              name: "Disgrace",
              author: ["2182010|J. M. Coetzee"],
              description: [
                "Strictly speaking, my interest is not in legal rights for animals but in a change of heart towards animals.",
              ],
            },
            {
              url: "/book/show/12749.Swann_s_Way",
              name: "Swann's way",
              author: ["94448|Marcel Proust"],
              description: [
                "We don't receive wisdom; we must discover it for ourselves after a journey that no one can take for us or spare us.",
              ],
            },
          ],
        },
      };
    });
};
module.exports = getPenguinData;
