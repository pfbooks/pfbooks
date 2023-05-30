const { Book } = require('../db');

const getAllBooksAdmin = async () => {
    const books = await Book.findAll();
    return books;
}

module.exports = getAllBooksAdmin;