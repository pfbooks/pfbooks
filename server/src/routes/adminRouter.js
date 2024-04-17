const {Router} = require("express");
const enablementUserController = require("../controllers/enablementUserController");
const availableBookController = require("../controllers/availableBookController");
const {validateJWT} = require("../tokenvalidation/tokenValidation");
const getAllBooksAdmin = require("../controllers/getAllBooksAdmin");


const adminRouter = Router();

///  RUTA UPDATE USER ENABLEMENT
adminRouter.put('/enablementUser', async (req, res) => {
    validateJWT(req, true);
    const { id, isActive } = req.body;
    try {
        const enablementUser = ( await enablementUserController(id, isActive) );
        res.status(200).json( enablementUser );
    } catch (error) {
        res.status(500).json({err: error.message});
    }
});

/// RUTA UPDATE BOOK AVAILABILITY
adminRouter.put('/availableBook', async (req, res) => {
    validateJWT(req, true);
    const { id, availability } = req.body;
    try {
        const availableBook = ( await availableBookController(id, availability) );
        res.status(200).json( availableBook );
    } catch (error) {
        res.status(500).json({err: error.message});
    }
});

/// RUTA GET ALL BOOKS
adminRouter.get('/allBooks', async (req, res) => {
    try {
        validateJWT(req, true);
        const allBooks = await getAllBooksAdmin();
        res.status(200).json( allBooks );
    } catch (error) {
        if (error.message === "invalid JWT credentials") {
            res.status(401).json({err: error.message});
        } else {
            res.status(500).json({err: error.message});
        }
    }
});

module.exports = adminRouter;