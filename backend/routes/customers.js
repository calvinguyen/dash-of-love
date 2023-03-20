import express from "express"
import {
     getCustomers, getCustomerById, createCustomer, updateCustomerById, updateCustomerStatusById
} from "../controllers/customers.js"

const router = express.Router()

// Get all rows from customers
 router.get("/", async (req, res) => {
    const data = await getCustomers()

    res.json(data);
})

// Get customer from customers by id
router.get("/:id", async (req, res) => {
    const customerId = req.params.id;
    const data = await getCustomerById(customerId);

    res.json(data);
})

// Create a customer
router.post("/", async (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const status = req.body.status;
    
    const data = await createCustomer(first_name, last_name, email, phone, status);
    res.json(data);
})

// Update a customer by id
router.put("/:id", async (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const status = req.body.status;
    const customerId = req.params.id;

    const result = await updateCustomerById(customerId, first_name, last_name, email, phone, status);
    res.json(result);
})

// Update a customer's status by id
router.put("/status/:id", async (req, res) => {
    const customerID = req.params.id;
    const status = req.body.status;

    const result = await updateCustomerStatusById(customerID, status);

    res.json(result);
})
export default router