var getISBN = require('./isbndb');
var getGoodReadsData = require('./goodreads');
var getAmazonData = require('./amazon-product-api');
// const  from './embeddedViewer';
var getWikiData = require('./wikipedia');
var getPenguinData = require('./penguin');

module.exports = { getISBN, getGoodReadsData, getAmazonData, getWikiData, getPenguinData }
