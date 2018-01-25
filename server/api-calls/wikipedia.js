var wtf = require('wtf_wikipedia');

var getWikiData = function(query) {
  wtf.from_api(query, 'en', function(markup) {
    var data = wtf.plaintext(markup);
    return data;
  })
}

module.exports = getWikiData;
