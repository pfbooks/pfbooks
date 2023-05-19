const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(value, salt);
              this.setDataValue('password', hash);
            },
        },
        adminRole:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: false });
};
