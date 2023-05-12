const { Book } = require("../db");


const getBooksByAuthor =  async ( author ) => {
    const booksByAuthor = await Book.findAll({
        where: {
            author: author
        }
    })
    if(booksByAuthor.length > 0) {
        return booksByAuthor;
    }
    else {
        throw new Error("There is not books with that title")
    }
}

module.exports = getBooksByAuthor;