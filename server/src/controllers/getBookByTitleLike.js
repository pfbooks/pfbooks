const { QueryTypes } = require('sequelize');
const { conn } = require('../db.js')


const getBookByTitleLike =  async ( title ) => {
    const bookByTitleLike = await conn.query(
        'SELECT * FROM "Books" WHERE title ILIKE :book_title',
        {
            replacements: { book_title: `%${title}%` },
            type: QueryTypes.SELECT
        }
    );

    if(bookByTitleLike.length > 0) {
        return bookByTitleLike;
    }
    else {
        throw new Error("There is not books with that title")
    }
}

module.exports = getBookByTitleLike;