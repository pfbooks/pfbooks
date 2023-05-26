const { Order, User, Book, BookOrder } = require('../db');

const getOrderById = async (id) => {
    const order = await Order.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'lastName', 'email', 'isActive']
            },
            { model: Book, through: { model: BookOrder, attributes: ['quantity'] } }
        ]
    });

    return order;
};

module.exports = getOrderById;
