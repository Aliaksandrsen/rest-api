var express = require('express');
var router = express.Router();

let books = [
    {
        id: 123,
        author: 'John Doe',
        title: 'JS book'
    },
    {
        id: 234,
        author: 'John Doe',
        title: 'JS book'
    },
];

router.get('/', function (req, res, next) {
    res.json(books);
});

router.get('/:id', function (req, res, next) {
    const resultBook = books.find(item => item.id === +req.params.id);

    if (!resultBook) res.status(404).json({
        status: `not found book ${+req.params.id}`,
    });
    res.json(resultBook);
});

module.exports = router;
