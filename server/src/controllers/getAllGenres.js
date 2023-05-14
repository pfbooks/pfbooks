const { QueryTypes } = require('sequelize');  /// uso RAW QUERIES - replacement from sequelize
const { conn } = require('../db.js')


const getAllGenres =  async ()  => {
    const genres = await conn.query(
        'SELECT DISTINCT unnest(genre) as genre FROM "Books"',
        {
            type: QueryTypes.SELECT
        }
    );

    return genres;
}

module.exports = getAllGenres;
