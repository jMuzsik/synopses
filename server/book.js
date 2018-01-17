var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    author_img: String,
    book_img: String,
    reviews: String,
    penguin_data: String,
    isbn: String,
    wikipedia: String,
    created_at: { type: Date, default: Date.now },
    storage_array_one: [],
    storage_array_two: []
})

//any additional methods can be here to alter the data when it is scraped from the API

//How to save to the database:

// var chris = new User({
//     name: 'Chris',
//     username: 'sevilayha',
//     password: 'password'
//   });

// chris.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully!');
//   });

//right before saving to the db:
// bookSchema.pre('save', function(next) {
//     var currentDate = new Date()
//     this.created_at = currentDate;
//     next();
//   });

// To find all or one or with id:
// User.find({}, function(err, users) {
// User.find({ title: 'something' }, function(err, users) {
// User.findById(1, function(err, user) {
//     if (err) throw err;

//     // object of all the users
//     console.log(users);
//   });

var Book = mongoose.model('Book', bookSchema)

module.exports = Book
