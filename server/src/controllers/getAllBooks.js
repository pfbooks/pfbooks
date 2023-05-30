const { Book } = require('../db');

const getAllBooks = async () => {
    const books = await Book.findAll({
        where : {
            availability : true
        }
    });
    return books;
}

module.exports = getAllBooks;