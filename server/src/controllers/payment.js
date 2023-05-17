const mercadopago = require("mercadopago");
// require("dotenv").config();
const { MERCADOPAGO_KEY } = process.env;
const URL = 'http://localhost:3001/'

mercadopago.configure({
  access_token: `${MERCADOPAGO_KEY}`,
});

const user = {
  name: 'Jorge',
  lastName: 'JImenez',
  email: 'jorge970102@gmail.com'
}

const payment = async (req, res) => {
  const compra= req.body;
  console.log(compra)

  let preference = {
    items: [
      {
        title: compra.title,
        // picture_url: compra.image,
        // description: compra.description,
        // currency_id: "USD",
        // category_id: "art",
        unit_price: compra.unit_price,
        quantity: compra.quantity,
      },
    ],
    payer: {
        name: user.name,
        surname: user.lastName,
        email: user.email
      },
    back_urls: {
      success: `${URL}`,
      failure: `${URL}`,
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.configure({
    access_token: `${MERCADOPAGO_KEY}`,
  });

  console.log(preference);
  await mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send(response.body))
    .catch((err) => res.status(400).send(console.log(err)));
};


 


module.exports = {
  payment,
};