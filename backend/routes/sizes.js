import express from "express"
import { 
    getSizes, getSizeById, createSize, updateSizeById, updateSizeStatusById 
} from "../controllers/sizes.js"

const router = express.Router()

// Get all rows from sizes 
router.get("/", async (req, res) => {
    const data = await getSizes()

    res.json(data);
})

// Get size from sizes by id
router.get("/:id", async (req, res) => {
    const typeID = req.params.id;
    const data = await getSizeById(typeID);

    res.json(data);
})

// Create a size
router.post("/", async (req, res) => {
    const type = req.body.type;
    const price = req.body.price;
    const status = req.body.status
    
    const data = await createSize(type, price, status);
    res.json(data);
})

// Update a size by id
router.put("/:id", async (req, res) => {
    const type = req.body.type
    const price = req.body.price;
    const status = req.body.status;
    const typeID = req.params.id;

    const result = await updateSizeById(typeID, type, price, status);
    res.json(result);
})

// Update a sizes's status by id
router.put("/status/:id", async (req, res) => {
    const typeID = req.params.id;
    const status = req.body.status;

    const result = await updateSizeStatusById(typeID, status);

    res.json(result);
})

export default router