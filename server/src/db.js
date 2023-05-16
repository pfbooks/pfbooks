require("dotenv").config();

const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const BookModel = require("./models/Book");
const UserModel = require("./models/User");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/books_ecommerce`,
  {
    logging: false,
    native: false,
  }
);

BookModel(sequelize);
UserModel(sequelize);

const { Book, User } = sequelize.models;

//relacion entre usuario y login
// User.belongsTo(Person, {
//   foreignKey: "person_id",
//   onDelete: "CASCADE",
// });

// Person.hasMany(User, {
//   foreignKey: "person_id",
//   onDelete: "CASCADE",
// });

  Book.belongsToMany(User, { through: "UsersBooks" });
  User.belongsToMany(Book, { through: "UsersBooks" });

module.exports = {
  Book,
  User,
  conn: sequelize,
};
