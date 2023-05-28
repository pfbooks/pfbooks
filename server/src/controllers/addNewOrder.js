const { Order, User, BookOrder } = require("../db");

const addNewOrder = async (books, userId) => {
  try {
    console.log(books);
    console.log(userId);

    const quantity = books.reduce((acc, book) => acc + book.quantity, 0);
    console.log(`la cantidad es de ${quantity}`);
    let monto = 0;

    books.forEach((book) => {
      monto += book.quantity * book.unit_price;
    });
    console.log(`el monto es de ${monto}`);
    
    const user = await User.findByPk(userId);
    console.log(user);
    
    const newOrder = await Order.create({
      amount: monto,
      quantity: quantity,
    });

    await user.addOrder(newOrder);

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      await BookOrder.create({
        OrderId: newOrder.id,
        BookId: book.id,
        quantity: book.quantity,
      });
    }

    return newOrder;
  } catch (error) {
    console.log(error);
  }
};

module.exports = addNewOrder;

// const { Order, User, BookOrder } = require("../db");

// const addNewOrder = async ( books, userId) => {

//   try {
//     console.log(books)
//     console.log(userId)

//     const quantity = books.reduce((acc, book) => acc + book.quantity, 0)
//     console.log(`la cantidad es de ${quantity}`);
//     let monto = 0
//     books.forEach(book => {
//       monto += book.quantity * book.unit_price;
//     })

//     console.log(`el monto es de ${monto}`)
//     // Crear una nueva orden
//     const user = await User.findByPk(userId)
//     console.log(user);

//     await user.createOrder({
//           amount: monto,
//           quantity: quantity,
//         });

//         const newOrder = await user.getOrder()
//         console.log(newOrder)

//         // Asociar el usuario a la orden
//         await newOrder.addUser(user)
//         for( let book of books){
//           await BookOrder.create({
//             OrderId: newOrder.id,
//             BookId: book.id,
//             quantity: book.quantity,
//           });

//         }

//     return newOrder;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// module.exports = addNewOrder;
