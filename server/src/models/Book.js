const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Book', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            image: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            genre: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },

            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
            },
        },

        { timestamps: false });
};