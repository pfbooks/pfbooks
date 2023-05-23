const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Reviews', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull:false,
            defaultValue: 1,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull:true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull:false,
        },
    },
    { timestamps: false });
};
