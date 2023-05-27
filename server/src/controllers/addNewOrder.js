const { Order, User, BookOrder } = require("../db");
const { conn } = require('../db.js');
const { QueryTypes } = require("sequelize");

const addNewOrder = async ( books, userId) => {

  
  try {
    // console.log(books)
    // console.log(userId)


    const quantity = books.reduce((acc, book) => acc + book.quantity, 0)
    // console.log(typeof quantity)
    let monto = 0
    books.forEach(book => {
      monto += book.quantity * book.unit_price;
    })

    // console.log(typeof monto)
    // Crear una nueva orden
    const user = await User.findByPk(userId)
    console.log(user.id)
    const newOrder = await Order.create({
      amount: monto,
      quantity: quantity,
    });

    // // Crear los registros en la tabla intermedia BookOrder
    // for (let i = 0; i < books.length; i++) {
    //   await BookOrder.create({
    //     orderId: newOrder.id,
    //     bookId: books[i].id,
    //     quantity: books[i].quantity,
    //   });
    // }
    // await user.createOrder({
    //   amount: monto,
    //   quantity: quantity,
    // });

    // const newOrder = await user.getOrder()
    // console.log(newOrder)


    // Asociar el usuario a la orden
    // await newOrder.addUser(user)
    // for( let book in books){
    //   await BookOrder.create({
    //     OrderId: newOrder.id,
    //     BookId: book.id,
    //     quantity: book.quantity,
    //   });
      
    // }
    
    return 'Hecho';
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = addNewOrder;

// Verificar si hay libros repetidos en la orden
// const bookCounts = {};
// books.forEach((book) => {
//   const bookId = book.id;
//   bookCounts[bookId] = bookCounts[bookId] ? bookCounts[bookId] + 1 : 1;
// });

// Asociar los libros a la orden o incrementar la cantidad si ya existen
// for (let i = 0; i < books.length; i++) {
//   const book = books[i];
//   const bookId = book.id;

//   if (bookCounts[bookId] > 1) {
//     // Incrementar la cantidad del libro en la orden existente
//     await BookOrder.increment(
//       { quantity: bookCounts[bookId] },
//       {
//         where: {
//           orderId: newOrder.id,
//           bookId: bookId,
//         },
//       }
//     );
//   } else {
//     // Crear una nueva entrada en BookOrder para el libro
//   }
// }