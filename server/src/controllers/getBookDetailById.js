const { Book, Reviews } = require('../db');

const getBookDetailById = async ( id ) => {
    const bookDetail = await Book.findByPk(id, {
        include: {
            model: Reviews,
            through: {
                attributes: [],
            }
        }
    })
        // const bookDetail = await Book.findOne({
        //     where: {
        //         id : id
        //     },
        //     include: {
        //         model: Reviews,
        //         through: {
        //             attributes: [],
        //         }
        //     }
        // });
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