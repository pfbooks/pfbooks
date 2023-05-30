const { QueryTypes } = require('sequelize');  /// uso RAW QUERIES - replacement from sequelize
const { conn } = require('../db.js')


const getAllGenres =  async (author)  => {
    let query = 'SELECT distinct unnest(genre) as genre FROM "Books"';
    if(author) {
        query += ` WHERE author = '${author}'`;
    }
    const genres = await conn.query(
        query,
        {
            type: QueryTypes.SELECT
        }
    );

    return genres;
}

module.exports = getAllGenres;
