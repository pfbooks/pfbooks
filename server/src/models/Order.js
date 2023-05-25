const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Order', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            amount: {
                type: DataTypes.REAL,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        );
};