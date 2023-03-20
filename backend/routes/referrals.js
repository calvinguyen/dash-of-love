import express from "express"

import {
    getReferrals, getReferralById, createReferral, updateReferralById
} from "../controllers/referrals.js"

const router = express.Router()

// Get all rows from referral
router.get("/", async (req, res) => {
    const data = await getReferrals()

    res.json(data);
})

// Get referral type from referrals by id
router.get("/:id", async (req, res) => {
    const referralId = req.params.id;
    const data = await getReferralById(referralId);

    res.json(data);
})

// Create a referral
router.post("/", async (req, res) => {
    const type = req.body.Type;
    
    const data = await createReferral(type);
    res.json(data);
})

// Update a referral by id
router.put("/:id", async (req, res) => {
    const referallId = req.params.id;
    const type = req.body.Type;

    const result = await updateReferralById(referallId, type);
    res.json(result);
})

export default router