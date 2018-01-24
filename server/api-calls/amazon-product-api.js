var amazon = require('amazon-product-api');

var getAmazonData = function(isbn) {
  var client = amazon.createClient({
    awsId: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
    awsTag: process.env.AWS_ASSOCIATE_TAG
  });

  return client.itemLookup({
    idType: 'ISBN',
    itemId: isbn,
    responseGroup: 'EditorialReview,Images,Reviews,Similarities,'
  }).then((results) => {
    console.log('This is SmallImage: ', results[0].SmallImage)
    console.log('This is LargeImage: ', results[0].LargeImage)
    console.log('This is ImageSets: ', results[0].ImageSets[0].ImageSet)
    console.log('This is the front cover: ', results[0].ImageSets[0].ImageSet[1].LargeImage)
    console.log('This is back cover: ', results[0].ImageSets[0].ImageSet[0].LargeImage)
    console.log('This is Reviews: ', results[0].CustomerReviews)
    console.log('This is Editorial Reviews: ', results[0].EditorialReviews[0].EditorialReview)
    console.log('This is Similar Products: ', results[0].SimilarProducts[0].SimilarProduct)
  }).catch(err => console.log(err[0].Error))

}

module.exports = getAmazonData;
