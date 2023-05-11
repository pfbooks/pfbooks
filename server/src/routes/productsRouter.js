const { Router } = require('express');

const productsRouter = Router();

productsRouter.get ("/", (req, res) => {
    res.send("Hello world")
});

module.exports = productsRouter;