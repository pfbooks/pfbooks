const { Order, User, Book, BookOrder } = require('../db');

const getAllOrders = async () => {
    const orders = await Order.findAll({
        include: [
            { model: User, through: { attributes: [] } },
            { model: Book, through: { model: BookOrder, attributes: ['quantity'] } }
        ]
    });

    return orders;
}

module.exports = getAllOrders;