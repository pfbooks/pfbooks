const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
    access_token: "<ACCESS_TOKEN>",
});


paymentRouter.post("/payments", (req, res) => {
    
    const { user, pago } = req.body
    

    let preference = {
        items: [
            {
                title: pago.title,
                description: pago.description,
                picture_url: pago.image,
                quantity: pago.quantity,
                currency_id: "currency needed (ARS, USD, etc)",
                unit_price: pago.price
            }
        ],
        back_urls: {
            "success": "http://localhost:3000/feedback",
            "failure": "http://localhost:3000/feedback",
            "pending": "http://localhost:3000/feedback"
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
    .then(function (response) {
        res.status(200).json({
            id: response.body.id
        });
    }).catch(function (error) {
        res.status(500).json({global: error})
    });
});

paymentRouter.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.book_order_id
    }); 
});
