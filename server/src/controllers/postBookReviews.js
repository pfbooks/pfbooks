const { Book, Reviews } = require('../db');

const postBookReview = async (bookId, rating, comment, userName) => {
    const book = await Book.findByPk(bookId, {
        include: {
            model: Reviews,
            through: {
                attributes: [],
            }
        }
    });
    
    // console.log("BOOK",book)
    const newReviews = book.numReviews + 1;
    console.log("Num reviews", newReviews)
    const newRating = (book.rating + rating )

    const sumRating = book.Reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rating, newRating);
    const promeRating = sumRating / newReviews;
    const roundedRating = parseFloat(promeRating.toFixed(1));


// console.log("new rating", newRating)
    await Book.update(
        {
            rating: roundedRating,
            numReviews: newReviews,
        },
        {
            where: {
                id: bookId,
            }
        }
    );
    const review = await Reviews.create({
        bookId,
        rating,
        comment,
        userName,
    })
    await book.addReviews(review)
    return review;
}

module.exports = postBookReview;