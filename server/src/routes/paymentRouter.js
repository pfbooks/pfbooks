const { Router } = require('express');
const {payment} = require('../controllers/payment')

const paymentRouter = Router();

paymentRouter.post('/', payment)

module.exports = paymentRouter;