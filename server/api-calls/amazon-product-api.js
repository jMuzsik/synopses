var amazon = require("amazon-product-api");

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
      try {
        amazonData.amazon_reviews = results[0].CustomerReviews;
        amazonData.amazon_editorial_review =
          results[0].EditorialReviews[0].EditorialReview[0].Content[0];
        if (
          Array.isArray(
            (amazonData.amazon_similar_products = results[0].SimilarProducts)
          )
        ) {
          amazonData.amazon_similar_products =
            results[0].SimilarProducts[0].SimilarProduct;
        } else amazonData.amazon_similar_products = null;
        return amazonData;
      } catch (e) {
        console.log("THIS IS AFTER SUCCESS ERROR", e);
        return amazonData;
      }
    })
    .catch(function(err) {
      console.log(
        "THIS IS WHEN THE ITEM LOOKUP FAILS, AMAZON",
        err.Error[0].Message
      );
      return amazonData;
    });
};

module.exports = getAmazonData;
