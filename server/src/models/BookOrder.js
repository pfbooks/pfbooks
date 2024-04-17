const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define("BookOrder", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });}