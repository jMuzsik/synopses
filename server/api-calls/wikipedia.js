var wtf = require('wtf_wikipedia');

var getWikiData = function (query, callback) {

  return wtf.from_api(query, 'en', function (markup) {
    callback(wtf.plaintext(markup));
  })
}

module.exports = getWikiData;
