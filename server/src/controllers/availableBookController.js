const { Book } = require("../db");

const availableBookController = async ( id, availability) => {
    try {
        await Book.update(
            {
                availability: availability
            },
            {
                where:
                    { id: id }
            }
        );

        const isAvailableBook = await Book.findByPk(id);
        return isAvailableBook;

    } catch (error) {
        console.error("update failed !");
        throw error;
    }
};

module.exports = availableBookController;