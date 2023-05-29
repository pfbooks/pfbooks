const { QueryTypes } = require('sequelize');
const { conn } = require('../db.js')


const getAllAuthors =  async (genre)  => {
    let query = 'SELECT distinct author FROM "Books"'
    if(genre) {
        query += ` WHERE genre @> '{"${genre}"}'`;
    }
    const authors = await conn.query(
        query ,
        {
            type: QueryTypes.SELECT
        }
    );

    return authors;
}

module.exports = getAllAuthors;