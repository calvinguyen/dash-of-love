import express from "express"

import {
    getOrders, getOrderById, createOrder, updateOrderStatusById,
    getAdminOrderView, getOrderStatusDescriptions
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
        customerID, cakesID, referralID, cake_details, desired_date 
    } = req.body;
    
    const data = await createOrder(customerID, cakesID, referralID, cake_details, desired_date);
    res.json(data);
})

// Update a order's status by id
router.put("/status/:id", async (req, res) => {
    const orderId = req.params.id;
    const status = req.body.statusID;

    const result = await updateOrderStatusById(orderId, status);

    res.json(result);
})

// Get Order View for Admin Order Table 
router.get("/admin/order", async (req, res) => {
    const data = await getAdminOrderView();

    res.json(data);
})

export default router

// Get all rows from orders 
router.get("/status/descriptions", async (req, res) => {
    const data = await getOrderStatusDescriptions();

    res.json(data);
})