const { Order, User, BookOrder } = require("../db");
const { conn } = require('../db.js');
const { QueryTypes } = require("sequelize");

const addNewOrder = async (amount, quantity, books, user) => {
  try {
    const maxId = await conn.query(
      'SELECT max(id) AS id FROM "Orders"',
      {
        type: QueryTypes.SELECT
      }
    );
    const id = maxId[0].id + 1;

    // Crear una nueva orden
    const newOrder = await Order.create({
      id,
      amount,
      quantity,
    });

    // Asociar el usuario a la orden
    await newOrder.addUser(user);

    // Verificar si hay libros repetidos en la orden
    const bookCounts = {};
    books.forEach((book) => {
      const bookId = book.id;
      bookCounts[bookId] = bookCounts[bookId] ? bookCounts[bookId] + 1 : 1;
    });

    // Asociar los libros a la orden o incrementar la cantidad si ya existen
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const bookId = book.id;

      if (bookCounts[bookId] > 1) {
        // Incrementar la cantidad del libro en la orden existente
        await BookOrder.increment(
          { quantity: bookCounts[bookId] },
          {
            where: {
              orderId: newOrder.id,
              bookId: bookId,
            },
          }
        );
      } else {
        // Crear una nueva entrada en BookOrder para el libro
        await BookOrder.create({
          orderId: newOrder.id,
          bookId: bookId,
          quantity: 1,
        });
      }
    }

    return newOrder;
  } catch (error) {
    throw new Error("No se pudo crear correctamente la orden");
  }
};

module.exports = addNewOrder;

// const { Order, User, BookOrder } = require("../db");
// const { conn } = require('../db.js')
// const {QueryTypes} = require("sequelize");

// const addNewOrder = async ( amount, quantity, book, user) => {

//     const addBooks = (book) => {
//         const orderBooks = [];
//         const aux = 0;

//         for(let i = book[0].id ; i = book.length; i++) {
//             aux = book.id;
//             if()
//             orderBooks.push(book[i])
//         }
//     } ;

//     try {
//         const maxId = await conn.query(
//             'SELECT max(id) AS id FROM "Orders"',
//             {
//                 type: QueryTypes.SELECT
//             })
//         const id = maxId[0].id + 1
//         const newOrder = await Order.create({
//             id,
//             amount, 
//             quantity,
//             user: [{id: user.id}],
//             orderBooks: [] 
//         }, {
//             include: "users",
//             include: "bookOrders"
//         }
//         );
//         return newOrder
//     }
//     catch (error){
//         throw new Error("No se pudo crear correctamente")

//     }
// };

// module.exports = addNewOrder;