const router = require('express').Router()

router.get('/books', (req, res) => {
  res.send('All the books')
})

router.get('/books/:book', (req, res) => {
  res.send('Some data')
})

router.post
