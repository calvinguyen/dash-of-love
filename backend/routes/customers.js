import express from "express"
import { getCustomers } from "../controllers/customers.js"

const router = express.Router()

// Get all rows from customers
 router.get("/", async (req, res) => {
    const data = await getCustomers()

    res.json(data);
})

export default router