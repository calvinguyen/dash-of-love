import express from "express"
import { 
    getTypes, getTypeById, createType, updateTypeById, updateTypeStatusById,
    getTypesWithDesc
} from "../controllers/types.js"

const router = express.Router()

// Get all rows from types 
router.get("/", async (req, res) => {
    const data = await getTypes()

    res.json(data);
})

// Get type from Cake_Type by id
router.get("/:id", async (req, res) => {
    const typeID = req.params.id;
    const data = await getTypeById(typeID);

    res.json(data);
})

// Create a type
router.post("/", async (req, res) => {
    const type = req.body.type;
    const price = req.body.price;
    const status = req.body.statusID;
    
    const data = await createType(type, price, status);
    res.json(data);
})

// Update a type by id
router.put("/:id", async (req, res) => {
    const type = req.body.type;
    const price = req.body.price;
    const status = req.body.statusID;
    const typeID = req.params.id;

    const result = await updateTypeById(typeID, type, price, status);
    res.json(result);
})

// Update a type's status by id
router.put("/status/:id", async (req, res) => {
    const typeID = req.params.id;
    const status = req.body.statusID;

    const result = await updateTypeStatusById(typeID, status);

    res.json(result);
})

// Get all types with status descriptions
router.get("/admin/types-view", async (req, res) => {
    const data = await getTypesWithDesc()

    res.json(data);
})

export default router