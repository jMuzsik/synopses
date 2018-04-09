var amazon = require("amazon-product-api");

var findDeep = require("../utils").findDeep;

var getAmazonData = function(isbn) {
  var client = amazon.createClient({
    awsId: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
    awsTag: process.env.AWS_ASSOCIATE_TAG,
  });

  var amazonData = {
    amazon_reviews: [],
    amazon_editorial_review: "",
    amazon_similar_products: [],
  };
  return client
    .itemLookup({
      idType: "ISBN",
      itemId: isbn,
      responseGroup: "EditorialReview,Images,Reviews,Similarities,",
    })
    .then(function(results) {
      // Grab each data needed individually
      amazonData.amazon_reviews = findDeep(results, [0, "CustomerReviews"], {
        IFrameURL: [
          '<iframe title="This is a wikipidia article because Amazon Iframe did not properly get scraped" src="https://en.wikipedia.org/wiki/Error"></iframe>',
        ],
      });

      amazonData.amazon_similar_products = findDeep(
        results,
        [0, "SimilarProducts", 0, "SimilarProduct"],
        [
          {
            Title: ["In Search of Lost Time, Vol. 2"],
            ASIN: ["0143039075"],
          },
          {
            Title: ["Sodom and Gomorrah"],
            ASIN: ["0143039318"],
          },
          {
            Title: ["Swann's Way"],
            ASIN: ["0142437964"],
          },
        ]
      );

      amazonData.amazon_editorial_review = findDeep(
        results,
        [0, "EditorialReviews", 0, "EditorialReview", 0, "Content", 0],
        "No Amazon Editorial Review for this book."
      );

      return amazonData;
    })
    .catch(function(err) {
      if (Array.isArray(err.Error)) {
        if (err.Error[0].message) {
          console.log(
            "THIS IS WHEN THE ITEM LOOKUP FAILS, AMAZON",
            err.Error[0].Message
          );
        }
      } else {
        console.log("THIS IS WHEN THE ITEM LOOKUP FAILS, AMAZON");
      }
      return amazonData;
    });
};

module.exports = getAmazonData;
