const { Router } = require('express');
const getAllBooks = require('../controllers/getAllBooks');
const getBookDetailById = require('../controllers/getBookDetailById');
const getBooksByCombinedFilters = require('../controllers/getBooksByCombinedFilters');
const updateBookById = require("../controllers/updateBookById");
const addNewBook = require("../controllers/addNewBook");
const {validateJWT} = require("../tokenvalidation/tokenValidation");


const bookRouter = Router();


/// RUTA GET ALL BOOKS Y GET BOOK BY TITLE
bookRouter.get("/", async (req, res) => {
    const { title , genre, author } = req.query;
    let books;
    try {
        if(title || genre || author) {
            books = await getBooksByCombinedFilters(title, genre, author)
        } else {
            books = await getAllBooks()
        }
        res.status(200).json(books);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

/// RUTA GET BOOK BY ID
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

/// RUTA UPDATE BOOK
bookRouter.put('/update',async (req, res) => {
    // validateJWT(req, true);
    const { id, title, author, price, image, genre, rating, stock, description } = req.body;
    try {
        const enablementUser = ( await updateBookById(id, title, author, price, image, genre, rating, stock, description) );
        res.status(200).json( enablementUser );
    }
    catch (error){
        res.status(500).json({err: error.message});
    }
});

//RUTA POST NEW BOOK
bookRouter.post('/addBook',async (req, res) => {
    // validateJWT(req, true);
    const { title, author, price, image, genre, rating, stock, description } = req.body;
    try {
        const newBook = ( await addNewBook( title, author, price, image, genre, rating ,stock, description) );
        res.status(200).json( newBook );
    }
    catch (error){
        res.status(500).json({err: error.message});
    }
});



module.exports = bookRouter;