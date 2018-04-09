const db = require("./mongoose.js");
const Book = require("./book.js");

function checkIfAlreadyCreated(isbn) {
  let check = false;
  Book.find({}).then(books => {
    books.forEach(book => {
      if (book.isbn === isbn) {
        check = true;
      }
    });
  });
  return check;
}

const findDeep = (data, pathArr, fallback) => {
  const len = pathArr.length;
  for (let i = 0; i < len; i++) {
    let path = pathArr[i];
    if(fallback === "cat"){
      console.log(
        data[path],
        Array.isArray(data[path]) ||
          findDeep.isObject(data[path]) ||
          typeof data[path] === "string"
      );
    }
    if (
      Array.isArray(data[path]) ||
      findDeep.isObject(data[path]) ||
      typeof data[path] === "string"
    ) {
      if (i === len - 1) {
        return data[path];
      }
      data = data[path];
    } else {
      return fallback;
    }
  }
};

findDeep.isObject = obj => obj && typeof obj === "object";

const getRankOfBook = (
  splitBook,
  splitQuery,
  splitAuthor,
  splitAuthorQuery
) => {
  level = 0;
  if (splitBook[0] === splitQuery[0]) level++;
  if (splitBook[1] === splitQuery[1]) level++;
  if (splitBook[2] === splitQuery[2]) level++;
  if (splitBook[3] === splitQuery[3]) level++;
  if (splitBook[4] === splitQuery[4]) level++;
  if (splitAuthor.length) {
    if (splitAuthor[0] === splitAuthorQuery[0]) level++;
    if (splitAuthor[1] === splitAuthorQuery[1]) level++;
    if (splitAuthor[2] === splitAuthorQuery[2]) level++;
  }
  return level;
};

const getRidOfExcessPenguinData = penguinData => {
  return penguinData.data.results.map(book => {
    const selectiveData = {};
    selectiveData.url = book.url;
    selectiveData.name = book.name;
    selectiveData.author = book.author;
    selectiveData.description = book.description;
    return selectiveData;
  });
};

const getRidOfExcessGoodreadsbookData = data => {
  return data.map(book => {
    const reformattedBook = {};
    reformattedBook.book_image = findDeep(
      book,
      ["image_url", 0],
      "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png"
    );
    if (reformattedBook.book_image.indexOf("nophoto") !== -1) {
      reformattedBook.author_image =
        "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png";
    }

    reformattedBook.author_name = findDeep(
      book,
      ["authors", 0, "author", 0, "name", 0],
      "No name"
    );

    reformattedBook.author_link = findDeep(
      book,
      ["authors", 0, "author", 0, "link", 0],
      "https://en.wikipedia.org/wiki/Nameless"
    );

    reformattedBook.title = findDeep(book, ["title", 0], "No title");

    reformattedBook.book_link = findDeep(
      book,
      ["link", 0],
      "https://en.wikipedia.org/wiki/Nameless"
    );
    return reformattedBook;
  });
};

module.exports = {
  checkIfAlreadyCreated,
  findDeep,
  getRidOfExcessPenguinData,
  getRidOfExcessGoodreadsbookData,
  getRankOfBook,
};
