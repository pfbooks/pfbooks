const setPreference = (pago) => {
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

    return preference;
};

module.exports = setPreference;