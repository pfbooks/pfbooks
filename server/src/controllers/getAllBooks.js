const { Book } = require('../db');

const getAllBooks = async (sortBy, sortMode) => {
    if(sortBy) {
        const queryOptions = {
            order : [
                [sortBy, sortMode.toUpperCase() === "ASCENDENT" ? "ASC" : "DESC"]
            ]
        }
        return await Book.findAll(queryOptions)
    } else {
        return  await Book.findAll();
    }

}

module.exports = getAllBooks;