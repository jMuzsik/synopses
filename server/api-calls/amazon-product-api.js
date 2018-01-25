var amazon = require('amazon-product-api');

var getAmazonData = function (isbn) {
  var client = amazon.createClient({
    awsId: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
    awsTag: process.env.AWS_ASSOCIATE_TAG
  });

  var amazonData = {
    front_cover: "",
    back_cover: "",
    amazon_reviews: [],
    amazon_editorial_review: "",
    amazon_similar_products: []
  }
  return client.itemLookup({
    idType: 'ISBN',
    itemId: isbn,
    responseGroup: 'EditorialReview,Images,Reviews,Similarities,'
  }).then(function (results) {
    amazonData.front_cover = results[0].ImageSets[0].ImageSet[1].LargeImage[0].URL[0];
    amazonData.back_cover = results[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
    amazonData.amazon_reviews = results[0].CustomerReviews;
    amazonData.amazon_editorial_review = results[0].EditorialReviews[0].EditorialReview[0].Content[0];
    amazonData.amazon_similar_products = results[0].SimilarProducts[0].SimilarProduct;
    return amazonData;
  }).catch(function (err) {
    return "Amazon API call error:" + err;
  })
}

module.exports = getAmazonData;
