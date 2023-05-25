const { Router } = require('express');
const getAllOrders = require("../controllers/getAllOrders");
const getOrderById = require("../controllers/getOrderById");
const addNewOrder = require("../controllers/addNewOrder");

const orderRouter = Router();

/// RUTA GET ALL ORDERS
orderRouter.get("/", async (req, res) => {
    try {
        const orders = (await getAllOrders()).map(order => order);
        res.status(200).json(orders);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

/// RUTA GET ORDER BY ID
orderRouter.get("/:orderId",async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderById = await getOrderById(orderId);

        res.status(200).json(orderById);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

//RUTA POST NEW ORDER
orderRouter.post('/add',async (req, res) => {
    // validateJWT(req, true);
    const { amount, quantity, book, user } = req.body;
    try {
        const newOrder = ( await addNewOrder( amount, quantity, book, user ) );
        res.status(200).json( newOrder );
    }
    catch (error){
        res.status(500).json({err: error.message});
    }
});

module.exports = orderRouter;