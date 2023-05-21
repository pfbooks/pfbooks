const { Router } = require('express');

const bookRouter = require("./bookRouter");
const genreRouter = require('./genreRouter')
const authorRouter = require('./authorRouter');
const paymentRouter = require('./paymentRouter')
const userRouter = require("./userRouter")
const authRouter = require('./authRouter');
const router = Router();

router.use("/books", bookRouter);
router.use ("/genre", genreRouter);
router.use("/authors", authorRouter);
router.use("/user", userRouter);
router.use("/payment", paymentRouter);
router.use("/login", authRouter);

module.exports = router;