const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const books = [
    {
        id: '123',
        author: 'John Doe',
        title: 'JS book'
    },
    {
        id: '234',
        author: 'John Doe',
        title: 'JS book'
    },
];

router.get('/', function (req, res, next) {
    res.json(books);
});

router.get('/:id', function (req, res, next) {
    const resultBook = books.find(item => item.id === req.params.id);

    if (!resultBook) res.status(404).json({
        status: `not found book ${req.params.id}`,
    });
    res.json(resultBook);
});

router.post('/', function (req, res, next) {
    const book = {
        id: uuidv4(),
        author: req.body.author || 'default author',
        title: req.body.title || 'default title',
    };
    books.push(book);
    res.json(book);
});

module.exports = router;
