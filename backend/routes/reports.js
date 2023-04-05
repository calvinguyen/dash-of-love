import express from "express"
import { 
    getOrdersByMonth, getMonthlyOrdersByYear, getReferralsFromOrders
} from "../controllers/reports.js"

const router = express.Router()

// Get all rows from orders by month view 
router.get("/monthly-order", async (req, res) => {
    const data = await getOrdersByMonth()

    res.json(data);
})

// Get monthly order count by year 
router.get("/monthly-order/:year", async (req, res) => {
    const year = req.params.year;
    const data = await getMonthlyOrdersByYear(year);

    res.json(data);
})

// Get all rows of Referrals
router.get("/referral", async (req, res) => {
    const data = await getReferralsFromOrders()

    res.json(data);
})

export default router