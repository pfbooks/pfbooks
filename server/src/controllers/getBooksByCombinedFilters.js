const { QueryTypes } = require('sequelize');  /// uso RAW QUERIES - replacement from sequelize
const { conn } = require('../db.js')


const getBookByCombinedFilters =  async ( title, genre, author) => {
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
        query +=  ` genre @> ARRAY['${genre}']::varchar[] `
        needsAnd = true;
    }
    if(author) {
        if(needsAnd) {
            query += ' AND '
        }
        query += ` author = '${author}' `;
        needsAnd = true;
    }
    const booksByCombinedFilters = await conn.query(
        query,
        {
            type: QueryTypes.SELECT
        }
    );

    return booksByCombinedFilters;

}

module.exports = getBookByCombinedFilters;