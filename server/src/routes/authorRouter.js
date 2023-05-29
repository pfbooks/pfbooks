const { Router } = require('express');
const getAllAuthors = require("../controllers/getAllAuthors");

const authorRouter = Router();

/// RUTA GET ALL AUTHORS
authorRouter.get("/", async (req, res) => {
    try {
        const {genre} = req.query;
        const authors = (await getAllAuthors(genre)).map(author => author.author);
        res.status(200).json(authors);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

module.exports = authorRouter;