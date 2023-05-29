const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define("Order", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // fecha que se realiza la orden
      // date: {
      //     type: DataTypes.DATE,
      // },

      // sujerencia adicionar el payment id de mercadopago o confirmacion del pedido.
      // paymentId: {
      //     type: DataTypes.?
      // }
    });
};