const router = require('express').Router()

const db = require('../mongoose.js');
const Book = require('../book.js')

router.get('/', (req, res) => {
    Book.find({}).then((books) => {
        res.json(books).status(200)
    }).catch(err => res.status(400).send(console.error))
})

router.get('/:book', (req, res) => {
    const title = req.params.book;
    Book.find({ url_title: title }).then((book) => {
        res.json(book).status(200)
    }).catch(err => res.status(400).send(console.error))
})

router.post('/', (req, res) => {
    const book = new Book(req.body)
    book.save().then(res.status(201).json({ message: "Buenisimo!!!" })).catch(error => res.status(401).json({ message: error }))
})

module.exports = router
