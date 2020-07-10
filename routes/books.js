const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const books = [
    {
pu        id: '1',
        author: 'Aleksandr Puixkin',
        title: 'The Dream',
    },
    {
        id: '2',
        author: 'Nikolai Gogol',
        title: 'The Overcoat',
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

router.put('/:id', function (req, res, next) {

    books.forEach(book => {
        if (book.id === req.params.id) {
            book.author = req.body.author;
            book.title = req.body.title;
        }
    });

    const newBook = books.find(item => item.id === req.params.id);
    res.json(newBook);
});

module.exports = router;
