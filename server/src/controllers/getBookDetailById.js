const { Book } = require('../db');

const getBookDetailById = async ( id ) => {
    const bookDetail = await Book.findOne({
        where: {
            id : id
        }
    });
    return {
        id: bookDetail.id,
        title: bookDetail.title,
        author: bookDetail.author,
        price: bookDetail.price,
        image: bookDetail.image,
        genre: bookDetail.genre.join(', '),
        rating: bookDetail.rating,
        stock: bookDetail.stock,
        description: bookDetail.description

    }

  
}

module.exports = getBookDetailById;