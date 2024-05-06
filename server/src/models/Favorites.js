const {DataTypes} = require('sequelize')

const Favorites = (sequelize) => {
    sequelize.define("Favorites", {
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // bookId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
        
    }, { timestamps: false})
}

module.exports = Favorites;