const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Pago', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pendente'
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
        },
        { timestamps: false });
};