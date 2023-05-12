const { Router } = require('express');
const getAllBooks = require('../controllers/getAllBooks');
const getBookDetailById = require('../controllers/getBookDetailById');
const getBookByTitleLike = require('../controllers/getBookByTitleLike');
const getBooksByGenre = require('../controllers/getBooksByGenre');
const getBooksByAuthor = require('../controllers/getBooksByAuthor');


const bookRouter = Router();


/// RUTA GET ALL BOOKS Y GET BOOK BY TITLE
bookRouter.get("/", async (req, res) => {
    const { title , genre, author } = req.query;
    let books;
    try {
        if (title){
            books = await getBookByTitleLike(title)
        } else if(genre) {
            books = await getBooksByGenre(genre)
        } else if(author) {
            books =  await getBooksByAuthor(author)
        }
        else {
            books = await getAllBooks()
        }
        res.status(200).json(books);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

/// RUTA  GET BOOK BY ID
bookRouter.get("/:bookId",async (req, res) => {
    try {
        const { bookId } = req.params;
        const bookDetailById = await getBookDetailById(bookId);

        res.status(200).json(bookDetailById);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});


module.exports = bookRouter;