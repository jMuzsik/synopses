const router = require('express').Router()

const db = require('../mongoose.js');
const Book = require('../book.js');

const getAllTheData = require('../getAllData');

router.get('/', (req, res) => {

    Book.find({}).then((books) => {
        console.log(books)
        res.json(books).status(200)
    }).catch(err => res.status(400).send(console.error))

})

router.get('/:book', (req, res) => {

    const query = req.params.book;

    Book.find({ url_title: query }).then((book) => {
        res.json(book).status(200);
    }).catch(err => res.status(400).send(console.error));

})

function checkIfUndefined(data) {
    Object.values(data).forEach(function (val) {
        if (val === undefined) {
            return true;
        }
    })
    return false;
}

router.post('/', (req, res) => {
    var query = req.body;
    getAllTheData(query.title, query.author, function (bookData) {
        var book = bookData;
        console.log('DO I GET IN HERE??', book)
        book = new Book(book);
        book.save(function(error) {
            if(error) console.error(error);
            else console.log("SAVED!!!!!!!")
        })
        .then(res.status(201).json({ message: "Buenisimo!!!" })).catch(error => res.status(401).json({ message: error }))
    });
})

module.exports = router
