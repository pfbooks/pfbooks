const { Router } = require('express');
const postBookReview = require('../controllers/postBookReviews');
const reviewRouter = Router();


reviewRouter.post("/", async (req, res) => {
    const {bookId, rating, comment, userName} = req.body
    try {
        const response = await postBookReview(bookId, rating, comment, userName)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = reviewRouter;