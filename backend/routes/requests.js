import express from "express"

import {
    getRequests, getRequestById, createRequest, updateRequestStatusById
} from "../controllers/requests.js"

const router = express.Router()

// Get all rows from requests 
router.get("/", async (req, res) => {
    const data = await getRequests();

    res.json(data);
})

// Get request from requests by id
router.get("/:id", async (req, res) => {
    const requestId = req.params.id;
    const data = await getRequestById(requestId);

    res.json(data);
})

// Create a request
router.post("/", async (req, res) => {
    const { 
        customerID, order_date, cakesID, referralID, details 
    } = req.body;
    
    const data = await createRequest(customerID, order_date, cakesID, referralID, details);
    res.json(data);
})

// Update a request's status by id
router.put("/status/:id", async (req, res) => {
    const requestId = req.params.id;
    const status = req.body.status;

    const result = await updateRequestStatusById(requestId, status);

    res.json(result);
})

export default router