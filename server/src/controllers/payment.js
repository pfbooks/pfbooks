const mercadopago = require("mercadopago");
// require("dotenv").config();
const { MERCADOPAGO_KEY } = process.env;
const URL = 'http://localhost:3000/'
const SUCCESS_URL = 'http://localhost:3000/success'

mercadopago.configure({
  access_token: `${MERCADOPAGO_KEY}`,
});

const payment = async (req, res) => {
  const obj = req.body;
  console.log(obj)

  let preference = {
    items: obj.items,
    // [
    //   {
    //     title: obj.items[0].title,
    //     // picture_url: compra.image,
    //     // description: compra.description,
    //     // currency_id: "USD",
    //     // category_id: "art",
    //     unit_price: obj.items[0].unit_price,
    //     quantity: obj.items[0].quantity,
    //   },
    // ],
    payer: obj.user,
    back_urls: {
      success: `${SUCCESS_URL}`,
      failure: `${URL}`,
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
    // guestCheckout: true, Averiguar porque rompe?
  };

  mercadopago.configure({
    access_token: `${MERCADOPAGO_KEY}`,
  });

  // console.log(preference);
  await mercadopago.preferences
    .create(preference)
    .then((response) => {
      console.log(response.body)
      res.status(200).send(response.body.id)})
    .catch((err) => res.status(400).send(console.log(err)));
};


 


module.exports = {
  payment,
};

// user: TTTEST69172
// pass: x2Ia9zucVu

// no: 5120 6944 7061 6271
// cvv: 123
// date: 11/25

// payer: {
//   phone: { area_code: '', number: '' },
//   address: { zip_code: '', street_name: '', street_number: null },
//   email: '',
//   identification: { number: '', type: '' },
//   name: '',
//   surname: '',
//   date_created: null,
//   last_purchase: null
// }