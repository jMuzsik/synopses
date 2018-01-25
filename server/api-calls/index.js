var getISBN = require('./isbndb');
var getGoodreadsData = require('./goodreads');
var getAmazonData = require('./amazon-product-api');
// const  from './embeddedViewer';
var getWikiData = require('./wikipedia');
var getPenguinData = require('./penguin');

module.exports = { getISBN, getGoodreadsData, getAmazonData, getWikiData, getPenguinData }
