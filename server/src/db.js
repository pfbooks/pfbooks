require('dotenv').config();

const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const BookModel = require('./models/Book');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/books_ecommerce`,{
    logging: false,
    native: false,
});

BookModel(sequelize);


const { Book } = sequelize.models;

module.exports = {
    Book,
    conn: sequelize,
};
