const { Router } = require("express");
const mercadopago = require("mercadopago");
// const setPreference = require("../controllers/setPreference");
require("dotenv").config();

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token: `${MP_ACCESS_TOKEN}`,
});

const paymentRouter = Router();

paymentRouter.post("/payments", (req, res) => {
  const { pago } = req.body; //luego pasar a setPreference ahora esta hardcodeado dentro de la function

  const user = {
    id: 1,
    name: "John",
    lastname: "Doe",
    email: "ejemplo@algo.com",
  };

  const preference = {
    items: [
      {
        title: pago.title,
        description: pago.description,
        quantity: 1,
        currency_id: "ARS",
        unit_price: pago.price,
        picture_url: pago.image,
      },
    ],
    payer: {
      name: user.name,
      surname: user.lastname,
      email: user.email,
    },
    back_urls: {
      success: "http://localhost:3000/feedback",
      failure: "http://localhost:3000/feedback",
      pending: "http://localhost:3000/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).json({ global: response.body.id });
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      res.status(500).json({ global: error });
    });
});

// paymentRouter.get("/feedback", function (req, res) {
//   try {
//     res.send(200).json({
//       Payment: req.query.payment_id,
//       Status: req.query.status,
//       MerchantOrder: req.query.book_order_id,
//     });
//   } catch (error) {
//       res.status(400).json({ error: error.message });
//   }
// });

// module.exports = paymentRouter
