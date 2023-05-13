const { QueryTypes } = require('sequelize');
const { conn } = require('../db.js')


const getAllAuthors =  async ()  => {
    const authors = await conn.query(
        'SELECT distinct author FROM "Books"',
        {
            type: QueryTypes.SELECT
        }
    );

    return authors;
}

module.exports = getAllAuthors;