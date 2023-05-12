const { Router } = require('express');

const bookRouter = require("./bookRouter");
const genreRouter = require('./genreRouter')
const authorRouter = require('./authorRouter');
const router = Router();

router.use('/books', bookRouter);
router.use ('/genre', genreRouter);
router.use('/authors', authorRouter)

module.exports = router;