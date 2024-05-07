const {DataTypes} = require('sequelize')

const Favorites = (sequelize) => {
    sequelize.define("Favorites", {

    }, { timestamps: false})
}

module.exports = Favorites;