const { Book, Reviews } = require('../db');

const postBookReview = async (bookId, rating, comment, userName) => {
    const book = await Book.findOne({
        where: {
            id: bookId,
        }
    });
    console.log("BOOK",book)
    const newReviews = book.numReviews + 1;
    console.log("Num reviews", newReviews)
    const newRating = (book.rating + rating ) / newReviews;
console.log("new rating", newRating)
    await Book.update(
        {
            rating: newRating,
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
    return book;
}

module.exports = postBookReview;