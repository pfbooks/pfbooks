const { Router } = require('express');

const productsRouter = require("./productsRouter");
const router = Router();

router.use('/hello-world', productsRouter);

module.exports = router;