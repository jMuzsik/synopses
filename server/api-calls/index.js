var getISBN = require("./isbndb");
var getGoodreadsData1 = require("./goodreads-1");
var getGoodreadsData2 = require("./goodreads-2");
var getAmazonData = require("./amazon-product-api");
var getWikiData = require("./wikipedia");
var getPenguinData = require("./penguin");

module.exports = {
  getISBN,
  getGoodreadsData1,
  getGoodreadsData2,
  getAmazonData,
  getWikiData,
  getPenguinData,
};
