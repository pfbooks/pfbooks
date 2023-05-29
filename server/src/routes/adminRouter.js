const {Router} = require("express");
const enablementUserController = require("../controllers/enablementUserController");
const {validateJWT} = require("../tokenvalidation/tokenValidation");


const adminRouter = Router();

///  RUTA UPDATE USER ENABLEMENT
adminRouter.put('/enablementUser', async (req, res) => {
    // validateJWT(req, true);
    const { id, isActive } = req.body;
    try {
        const enablementUser = ( await enablementUserController(id, isActive) );
        res.status(200).json( enablementUser );
    } catch (error) {
        res.status(500).json({err: error.message});
    }
});


module.exports = adminRouter;