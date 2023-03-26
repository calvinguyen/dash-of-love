import express from "express"

import {
    getOrders, getOrderById, createOrder, updateOrderStatusById
} from "../controllers/orders.js"

const router = express.Router()

// Get all rows from orders 
router.get("/", async (req, res) => {
    const data = await getOrders();

    res.json(data);
})

// Get order from orders by id
router.get("/:id", async (req, res) => {
    const orderId = req.params.id;
    const data = await getOrderById(orderId);

    res.json(data);
})

// Create a order
router.post("/", async (req, res) => {
    const { 
        customerID, cakesID, referralID, details, desired_date 
    } = req.body;
    
    const data = await createOrder(customerID, cakesID, referralID, details, desired_date);
    res.json(data);
})

// Update a order's status by id
router.put("/status/:id", async (req, res) => {
    const orderId = req.params.id;
    const status = req.body.statusID;

    const result = await updateOrderStatusById(orderId, status);

    res.json(result);
})

export default router