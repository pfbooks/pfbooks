const { Router } = require('express');
const getAllGenres = require("../controllers/getAllGenres");

const genreRouter = Router();

/// RUTA GET ALL GENRES
genreRouter.get("/", async (req, res) => {
    try {
        const genres = (await getAllGenres()).map(genre => genre.genre);
        res.status(200).json(genres);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

module.exports = genreRouter;