import express from "express"
import {
    getOrders, getOrderById, createOrder, updateOrderById,
    updateOrderStatusById, getAdminOrderView, getOrderStatusDescriptions,
    getCustomerOrders, getFullOrderById, getOrdersReadyToday, getOrdersNewToday,
    getOrdersThisWeek, getPaymentTypes
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

// Get full order details joined by id
router.get("/admin/full-order/:id", async (req, res) => {
    const orderId = req.params.id;
    const data = await getFullOrderById(orderId);

    res.json(data);
})

// Create a order
router.post("/", async (req, res) => {
    const { 
        customerID, cakesID, referralID, cake_details, desired_date, image
    } = req.body;
    
    const data = await createOrder(customerID, cakesID, referralID, cake_details, desired_date, image);
    res.json(data);
})

// Update an order by id
router.put("/:id", async (req, res) => {
    const orderId = req.params.id;
    const {
        cakesID, referralID, cake_details, statusID, desired_date, pick_up_details, final_price, paymentID
    } = req.body;

    const result = await updateOrderById(
        orderId, cakesID, referralID, cake_details, statusID, desired_date, pick_up_details, final_price, paymentID
    );

    res.json(result);
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

// Get all rows from order_status
router.get("/status/descriptions", async (req, res) => {
    const data = await getOrderStatusDescriptions();

    res.json(data);
})

// Get customer order history
router.get("/customer/order-history/:id", async (req, res) => {
    const customerId = req.params.id;
    const data = await getCustomerOrders(customerId);

    res.json(data);
})

// Get ready orders today
router.get("/admin/order/ready/:date", async (req, res) => {
    const today = req.params.date;
    const data = await getOrdersReadyToday(today);

    res.json(data);
})

// Get new orders today
router.get("/admin/order/new/:date", async (req, res) => {
    const today = req.params.date;
    const data = await getOrdersNewToday(today);

    res.json(data);
})

// Get orders this week
router.get("/admin/order/week/", async (req, res) => {
    const data = await getOrdersThisWeek();

    res.json(data);
})

// Get all rows from order_status
router.get("/payment/types", async (req, res) => {
    const data = await getPaymentTypes();

    res.json(data);
})

export default router