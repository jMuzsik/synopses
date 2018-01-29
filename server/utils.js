function grabTitleAndUrl(arr) {
  var titleArr = [{ title: String, urlTitle: String }];
  arr.forEach((book, i) => {
    titleArr[i]["title"] = book["title"];
    titleArr[i]["urlTitle"] = book["url_title"];
  });
  return titleArr;
}

module.exports = { grabTitleAndUrl };
