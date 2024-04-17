const { Router } = require('express');

const bookRouter = require("./bookRouter");
const genreRouter = require('./genreRouter')
const authorRouter = require('./authorRouter');
const paymentRouter = require('./paymentRouter')
const userRouter = require("./userRouter");
const authRouter = require('./authRouter');
const reviewRouter = require("./postReviewRouter")
const adminRouter = require('./adminRouter');
const orderRouter = require("./orderRouter");

const router = Router();

router.use("/books", bookRouter);
router.use("/genre", genreRouter);
router.use("/authors", authorRouter);
router.use("/user", userRouter);
router.use("/payment", paymentRouter);
router.use("/login", authRouter);
router.use("/reviews", reviewRouter);
router.use("/admin", adminRouter);
router.use("/order", orderRouter);

module.exports = router;