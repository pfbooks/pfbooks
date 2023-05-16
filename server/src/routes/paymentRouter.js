const { Router } = require("express");
const mercadopago = require("mercadopago");
const setPreference = require("../controllers/setPreference");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token: "<ACCESS_TOKEN>",
});

const paymentRouter = Router();

paymentRouter.post("/payments", (req, res) => {
  const { user, pago } = req.body;

  const preference = setPreference(pago);

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      res.status(500).json({ global: error });
    });
});

paymentRouter.get("/feedback", function (req, res) {
  try {
    res.send(200).json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.book_order_id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = paymentRouter;
