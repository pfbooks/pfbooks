const { Router } = require('express');
const getAllOrders = require("../controllers/getAllOrders");
const getOrderById = require("../controllers/getOrderById");
const addNewOrder = require("../controllers/addNewOrder");
const {validateJWT} = require("../tokenvalidation/tokenValidation");
const getOrdersByUserId = require("../controllers/getOrdersByUserId");

const orderRouter = Router();

/// RUTA GET ALL ORDERS
orderRouter.get("/", async (req, res) => {
    try {
        // validateJWT(req, true)
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
        // validateJWT(req, true);
        const { orderId } = req.params;
        const orderById = await getOrderById(orderId);

        res.status(200).json(orderById);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

/// RUTA GET ORDER BY USER ID
orderRouter.get("/by-user-id/:userId",async (req, res) => {
    try {
        const { userId } = req.params;
        const ordersByUserId = await getOrdersByUserId(userId);

        res.status(200).json(ordersByUserId);
    }

    catch (error) {
        res.status(400).json({ err : error.message });
    }
});

//RUTA POST NEW ORDER
orderRouter.post('/add',async (req, res) => {

    const { books, userId } = req.body;
    try {
        const newOrder = await addNewOrder(books, userId);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = orderRouter;
