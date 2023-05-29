require("dotenv").config();

const {Sequelize} = require("sequelize");

const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;


const OrderModel = require("./models/Order")
const BookModel = require("./models/Book");
const UserModel = require("./models/User");
const ReviewModel = require("./models/Reviews");
const BookOrderModel = require("./models/BookOrder")

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/books_ecommerce`,
    //'postgresql://postgres:k6EeWA2l16yqsRgAaYwR@containers-us-west-74.railway.app:7826/railway',
    {
        logging: false,
        native: false,
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        },
    }
);
BookOrderModel(sequelize)
OrderModel(sequelize);
BookModel(sequelize);
UserModel(sequelize);
ReviewModel(sequelize);

const {Book, User, Reviews, Order, BookOrder} = sequelize.models;

//relacion entre usuario y login
// User.belongsTo(Person, {
//   foreignKey: "person_id",
//   onDelete: "CASCADE",
// });

// Person.hasMany(User, {
//   foreignKey: "person_id",
//   onDelete: "CASCADE",
// });

Book.belongsToMany(User, {through: "UsersBooks"});
User.belongsToMany(Book, {through: "UsersBooks"});

User.hasMany(Order);
Order.belongsTo(User);

Book.belongsToMany(Order, {through: "BookOrder"});
Order.belongsToMany(Book, {through: "BookOrder"});

//relaciones review-book
Book.belongsToMany(Reviews, {through: "BookReviews"});
Reviews.belongsToMany(Book, {through: "BookReviews"});

module.exports = {
    Book,
    User,
    Reviews,
    Order,
    BookOrder,
    conn: sequelize,
};
