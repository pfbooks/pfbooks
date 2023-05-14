const { Book } = require("../db");


const getBooksByGenre =  async ( genre ) => {
    const booksByGenre = await Book.findAll({
        where: {
            genre: genre
        }
    })
    if(booksByGenre.length > 0) {
        return booksByGenre;
    }
    else {
        throw new Error("There is not books with that title")
    }
}

module.exports = getBooksByGenre;