import express from "express"
import { 
    getInvoices, getInvoiceById, createInvoice, updateInvoiceById, updateInvoiceStatusById 
} from "../controllers/invoices.js"

const router = express.Router()

// Get all rows from invoices 
router.get("/", async (req, res) => {
    const data = await getInvoices()

    res.json(data);
})

// Get invoice from invoices by id
router.get("/:id", async (req, res) => {
    const invoiceID = req.params.id;
    const data = await getInvoiceById(invoiceID);

    res.json(data);
})

// Create a invoice
router.post("/", async (req, res) => {
    const customerID = req.body.customerID;
    const orderID = req.body.orderID;
    const status = req.body.status
    
    const data = await createInvoice(customerID, orderID, status);
    res.json(data);
})

// Update a invoice by id
router.put("/:id", async (req, res) => {
    const customerID = req.body.customerID;
    const orderID = req.body.orderID;
    const status = req.body.status;
    const invoiceID = req.params.id;

    const result = await updateInvoiceById(invoiceID, customerID, orderID, status);
    res.json(result);
})

// Update a invoice's status by id
router.put("/status/:id", async (req, res) => {
    const invoiceID = req.params.id;
    const status = req.body.status;

    const result = await updateInvoiceStatusById(invoiceID, status);

    res.json(result);
})

export default router