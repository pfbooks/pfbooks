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


    await Favorites.create({
        UserId: userId,
        BookId: bookId
    })

    const allFavorites = await Favorites.findAll({
        where: {
            UserId: userId
        }
    });

    const favoritesBooks = allFavorites.map(fav => fav.BookId);

    return favoritesBooks;

}

const deleteFavorite = async (userId, bookId) => {
    const existingFavorite = await Favorites.findOne({
        where: {
            UserId: userId,
            BookId: bookId
        }
    })
    if (existingFavorite) {
        await existingFavorite.destroy();
        const allFavorites = await Favorites.findAll({
            where: {
                UserId: userId
            }
        });
    
        const favoritesBooks = allFavorites.map(fav => fav.BookId);
    
        return favoritesBooks;
    }

    throw Error(`This book is not in the ${"user's"} favorites list`);

}

module.exports = {
    getFavorites, addFavorite, deleteFavorite
}