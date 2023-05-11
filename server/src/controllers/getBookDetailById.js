const { Book } = require('../db');

const getBookDetailById = async ( id ) => {
    const bookDetail = await Book.findOne({
        where: {
            id : id
        }
    });

    return bookDetail;
}

module.exports = getBookDetailById;