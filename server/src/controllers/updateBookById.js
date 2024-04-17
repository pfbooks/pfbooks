const { Book } = require("../db");

const updateBookById = async (id, title, author, price, image, genre, rating, stock, description, availability ) => {
    try {
        await Book.update(
            {
                title: title,
                author: author,
                price: price,
                image: image,
                genre: genre,
                rating: rating,
                stock: stock,
                description: description,
                availability: true,
            },
            {
                where:
                    { id: id }
            }
        );

        const updatedBook = await Book.findByPk(id);
        return updatedBook

    } catch (error) {
        console.error("update failed !");
        throw error;
    }
};

module.exports = updateBookById;