const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let books = [
    {
        id: '1',
        author: 'Aleksandr Puixkin',
        title: 'The Dream',
    },
    {
        id: '2',
        author: 'Nikolai Gogol',
        title: 'The Overcoat',
    },
];

router.get('/', (req, res, next) => {
    res.json(books);
});

router.get('/:id', (req, res, next) => {
    const resultBook = books.find(item => item.id === req.params.id);

    if (!resultBook) res.status(404).json({
        status: `not found book ${req.params.id}`,
    });
    res.json(resultBook);
});

router.post('/', (req, res, next) => {
    const book = {
        id: uuidv4(),
        author: req.body.author || 'default author',
        title: req.body.title || 'default title',
    };
    books.push(book);
    res.json(book);
});

router.put('/:id', (req, res, next) => {

    books.forEach(book => {
        if (book.id === req.params.id) {
            book.author = req.body.author;
            book.title = req.body.title;
        }
    });

    const newBook = books.find(item => item.id === req.params.id);
    res.json(newBook);
});

router.delete('/:id', (req, res, next) => {
    const newBooks = books.filter(book => book.id !== req.params.id);

    const isSometingDelete = newBooks.length !== books.length;

    books = [...newBooks];

    if (!isSometingDelete) {
        res.status(200).send(`No Book with id ${req.params.id}`);
    };

    if (isSometingDelete) {
        res.status(200).send(`Book with id ${req.params.id} was deleted`);
    } else {
        res.status(400).send(`Something was wrong`);
    }
});

module.exports = router;
