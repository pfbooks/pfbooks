const { Order, User, BookOrder } = require("../db");

const addNewOrder = async (books, userId) => {
  try {

    const quantity = books.reduce((acc, book) => acc + book.quantity, 0);
    let monto = 0;

    books.forEach((book) => {
      monto += book.quantity * book.unit_price;
    });
    
    const user = await User.findByPk(userId);
    
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