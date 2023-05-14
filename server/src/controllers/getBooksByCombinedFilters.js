const { QueryTypes } = require('sequelize');  /// uso RAW QUERIES - replacement from sequelize
const { conn } = require('../db.js');


const getBookByCombinedFilters =  async ( title, genre, author, sortBy, sortMode ) => {
    let query = `SELECT * FROM "Books" WHERE`;
    let needsAnd = false
    if(title) {
        query += ` title ILIKE '%${title}%' `
        needsAnd = true;
    }
    if(genre) {
        if(needsAnd) {
            query += ' AND '
        }
        query += ` genre = '${genre}' `;
        needsAnd = true;
    }
    if(author) {
        if(needsAnd) {
            query += ' AND '
        }
        query += ` author = '${author}' `;
        needsAnd = true;
    }

    if ( sortBy ){
        if (sortBy.toUpperCase() === "RATING" ) {
            query += " ORDER BY rating "
        }

        if( sortBy.toUpperCase() === "PRICE" ) {
            query += " ORDER BY price "
        }

        if( sortMode ) {
            if(sortMode.toUpperCase() === "ASCENDENT") {
                query += " ASC "
            } else {
                query += " DESC "
            }
        }
    }


    const booksByCombinedFilters = await conn.query(
        query,
        {
            type: QueryTypes.SELECT
        }
    );

    if(booksByCombinedFilters.length > 0) {
        return booksByCombinedFilters;
    }
    else {
        throw new Error("There is not books with that title")
    }
}

module.exports = getBookByCombinedFilters;