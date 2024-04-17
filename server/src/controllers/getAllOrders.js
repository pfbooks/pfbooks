const {Order, User, Book, BookOrder} = require('../db');

const getAllOrders = async () => {
    const orders = await Order.findAll({
        include:
            [
                {
                    model: User,
                    attributes: ['id', 'name', 'lastName', 'email', 'isActive']
                },
                {
                    model: Book, through: { model: BookOrder, attributes: ['quantity'] }
                }]
    });

    return orders;
}

module.exports = getAllOrders;