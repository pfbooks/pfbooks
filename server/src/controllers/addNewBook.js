const { Book } = require("../db");
const { conn } = require('../db.js')
const {QueryTypes} = require("sequelize");

const addNewBook = async ( title, author, price, image, genre, rating, stock, description) => {
    try {
        const maxId = await conn.query(
            'SELECT max(id) AS id FROM "Books"',
            {
                type: QueryTypes.SELECT
            })
        const id = maxId[0].id + 1
        const newBook = await Book.create({
            id, title, author, price, image, genre, rating, stock, description
        });
        return newBook
    }
    catch (error){
        throw new Error("No se pudo crear correctamente")

    }
};

module.exports = addNewBook;