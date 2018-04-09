var wtf = require("wtf_wikipedia");

var getWikiData = function(query, callback) {
  wtf.from_api(query, "en", function(markup) {
    // Returns null if no wikipidia article associated with author
    if (markup === null) {
      markup =
        query +
        " has no wikipidia article. If you love this person, this may be your calling to create one.";
      return callback(markup);
    }
    return callback(wtf.plaintext(markup));
  });
};

module.exports = getWikiData;
