const { Order, User, Book, BookOrder } = require('../db');

const getOrderById = async (id) => {
    const order = await Order.findByPk(id, {
        include: [
            { model: User, through: { attributes: [] } },
            { model: Book, through: { model: BookOrder, attributes: ['quantity'] } }
        ]
    });

    return order;
};

module.exports = getOrderById;
