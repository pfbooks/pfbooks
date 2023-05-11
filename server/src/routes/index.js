const { Router } = require('express');

const bookRouter = require("./bookRouter");
const genreRouter = require('./genreRouter')
const router = Router();

router.use('/books', bookRouter);
router.use ('/genre', genreRouter);

module.exports = router;