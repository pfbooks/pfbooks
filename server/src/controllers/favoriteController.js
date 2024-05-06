const { Favorites } = require('../db')


const getFavorites = async (userId) => {
    const favorites = await Favorites.findAll({
        where: {
            UserId: userId
        }
    });

    if (favorites) {
        const favoritesBooks = favorites.map(fav => fav.BookId);
        return favoritesBooks;
    };
    return [];

}

const addFavorite = async (userId, bookId) => {
    const existingFavorite = await Favorites.findOne({
        where: {
            UserId: userId,
            BookId: bookId
        }
    })
    if (existingFavorite) throw Error('Already exist');


    const favorite = await Favorites.create({
        UserId: userId,
        BookId: bookId
    })

    return favorite;

}

const deleteFavorite = async (userId, bookId) => {
    const existingFavorite = await Favorites.findOne({
        where: {
            UserId: userId,
            BookId: bookId
        }
    })
    if(existingFavorite) {
        await existingFavorite.destroy();
        return 'Book removed from favorites'
    }

    return `The book is not in the ${"user's"} favorites list`

}

module.exports = {
    getFavorites, addFavorite, deleteFavorite
}