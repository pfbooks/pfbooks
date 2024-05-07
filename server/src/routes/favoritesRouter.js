const {Router} = require('express');
const {getFavorites, addFavorite, deleteFavorite} = require('../controllers/favoriteController');

const favoritesRouter = Router();


favoritesRouter.get('/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const response = await getFavorites(userId);
        res.status(200).json(response);
    } catch (error) {
        console.log({error : error.message})
        res.status(400).json({error: error.message})
        
    }

})
favoritesRouter.post('/add/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const {bookId} = req.body;
        const response = await addFavorite(userId, bookId);
        res.status(201).json(response);
    } catch (error) {
        console.log({error : error.message})
        res.status(400).json({error: error.message})
        
    }

})
favoritesRouter.delete('/delete/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const {bookId} = req.body;
        const response = await deleteFavorite(userId, bookId);
        res.status(201).json(response);
    } catch (error) {
        console.log({error : error.message})
        res.status(400).json({error: error.message})
        
    }

})

module.exports = favoritesRouter;