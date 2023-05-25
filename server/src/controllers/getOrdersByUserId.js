const { Order, User, Book, BookOrder } = require('../db');

const getOrdersByUserId = async (userId) => {
    const order = await Order.findAll({

        where: {
            UserId: userId
        },

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

module.exports = getOrdersByUserId;