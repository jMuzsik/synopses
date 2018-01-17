var userArgs = process.argv.slice(2);
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Book = require('./server/book.js');

var some_book = new Book({
    author_img: "thing",
    book_img: "thingy",
    reviews: "long thingy",
    penguin_data: "anther long thingy",
    isbn: "l1231231231231231",
    wikipedia: "lots of things",
    storage_array_one: ["cat", "rabbit"],
    storage_array_two: ["elephant", "monkey"]
})

// var chris = new User({
//     name: 'Chris',
//     username: 'sevilayha',
//     password: 'password'
//   });

// chris.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully!');
//   });

// author_img: String,
// book_img: String,
// reviews: String,
// penguin_data: String,
// isbn: String,
// wikipedia: String,
// created_at: { type: Date, default: Date.now },
// storage_array_one: [],
// storage_array_two: []

some_book.save(function (err) {
    if (err) throw err;
    console.log('Saved successfully!')
    mongoose.connection.close();
})
