import express from "express"
import { 
    getFlavors, getFlavorById, createFlavor, updateFlavorById,
    updateFlavorStatusById, getFlavorsWithDesc
} from "../controllers/flavors.js"

const router = express.Router()

// Get all rows from flavors 
router.get("/", async (req, res) => {
    const data = await getFlavors()

    res.json(data);
})

// Get flavor from flavors by id
router.get("/:id", async (req, res) => {
    const flavorId = req.params.id;
    const data = await getFlavorById(flavorId);

    res.json(data);
})

// Create a flavor
router.post("/", async (req, res) => {
    const flavor = req.body.flavor;
    const status = req.body.statusID;
    
    const data = await createFlavor(flavor, status);
    res.json(data);
})

// Update a flavor by id
router.put("/:id", async (req, res) => {
    const flavor = req.body.flavor;
    const status = req.body.statusID;
    const flavorId = req.params.id;

    const result = await updateFlavorById(flavorId, flavor, status);
    res.json(result);
})

// Update a flavor's status by id
router.put("/status/:id", async (req, res) => {
    const flavorId = req.params.id;
    const status = req.body.statusID;

    const result = await updateFlavorStatusById(flavorId, status);

    res.json(result);
})

// Get all flavors with status descriptions
router.get("/admin/flavors-view", async (req, res) => {
    const data = await getFlavorsWithDesc()

    res.json(data);
})

export default router