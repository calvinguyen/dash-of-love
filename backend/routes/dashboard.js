import express from "express"
import { 
    getOrdersByMonth, getReferralsFromOrders
} from "../controllers/dashboard.js"

const router = express.Router()

// Get all rows from orders by month view 
router.get("/", async (req, res) => {
    const data = await getOrdersByMonth()

    res.json(data);
})

// Get all rows of Referrals
router.get("/referrals", async (req, res) => {
    const data = await getReferralsFromOrders()

    res.json(data);
})

export default router