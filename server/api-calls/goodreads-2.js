var parseString = require("xml2js").parseString;
var request = require("request-promise");

var findDeep = require("../utils").findDeep;

var getGoodreadsData2 = function(secondOptions, callback) {
  //AFTER QUERY FOR BOOK SPECIFIC DATA USING TITLE FROM ISBN QUERY

  var goodreadsData = {
    goodreads_description: "",
    goodreads_reviews_widget: "",
    goodreads_author_image: "",
    goodreads_author_link: "",
    goodreads_similar_books: [],
    author_name: "",
  };

  request(secondOptions)
    .then(function(response) {
      var xml = response;
      parseString(xml, { trim: true }, function(err, result) {
        if (err) {
          console.log("GOODREADS PARSING ERROR", err);
          callback(goodreadsData);
          return;
        }

        goodreadsData.goodreads_description = findDeep(
          result,
          ["GoodreadsResponse", "book", 0, "description", 0],
          "The secret of happiness is not doing what we like but in liking what we do."
        );

        goodreadsData.goodreads_reviews_widget = findDeep(
          result,
          ["GoodreadsResponse", "book", 0, "reviews_widget", 0],
          `<iframe src="https://wonderopolis.org/widget" width="360" height="730" frameborder="0"></iframe>`
        );

        goodreadsData.goodreads_author_image = findDeep(
          result,
          [
            "GoodreadsResponse",
            "book",
            0,
            "authors",
            0,
            "author",
            0,
            "image_url",
            0,
            "_",
          ],
          "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png"
        );
        goodreadsData.author_name = findDeep(
          result,
          [
            "GoodreadsResponse",
            "book",
            0,
            "authors",
            0,
            "author",
            0,
            "name",
            0,
          ],
          ""
        );
        
        goodreadsData.goodreads_author_link = findDeep(
          result,
          [
            "GoodreadsResponse",
            "book",
            0,
            "authors",
            0,
            "author",
            0,
            "link",
            0,
          ],
          "Link not found"
        );
        
        goodreadsData.goodreads_similar_books = findDeep(
          result,
          ["GoodreadsResponse", "book", 0, "similar_books", 0, "book"],
          [
            {
              author_link: [
                "https://www.goodreads.com/author/show/6165.James_T_Farrell",
              ],
              name: ["James T. Farrell"],
              image_url: [
                "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png",
              ],
              book_link: [
                "https://www.goodreads.com/book/show/126603.Studs_Lonigan",
              ],
              title: ["Studs Lonigan"],
            },
            {
              author_link: [
                "https://www.goodreads.com/author/show/9947.Anthony_Powell",
              ],
              name: ["Anthony Powell"],
              image_url: [
                "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png",
              ],
              book_link: [
                "https://www.goodreads.com/book/show/16114.A_Dance_to_the_Music_of_Time",
              ],
              title: [
                "A Dance to the Music of Time: 3rd Movement (A Dance to the Music of Time, #7-9)",
              ],
            },
          ]
        );
        callback(goodreadsData);
        return;
      });
    })
    .catch(function(err) {
      console.log("ERROR QUERYING GOODREADS API", err);
      callback(goodreadsData);
      return;
    });
  };

module.exports = getGoodreadsData2;
