import express from "express"
import { 
    getFlavors, getFlavorById, createFlavor, updateFlavorById, deleteFlavorById 
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
//!TODO: Need to test in postman 
router.post("/", async (req, res) => {
    const flavor = req.body.flavor;
    
    const data = await createFlavor(flavor);
    res.json(data);
})

// Update a flavor by id
//!TODO: Need to test in postman 
router.put("/:id", async (req, res) => {
    const flavor = req.body.flavor;
    const flavorId = req.params.id;

    const result = await updateFlavorById(flavorId, flavor);
    res.json(result);
})

// Delete a flavor by id
//!TODO: Need to test in postman 
router.delete("/:id", async (req, res) => {
    const flavorId = req.params.id;
    const result = await deleteFlavorById(flavorId);

    res.json("Succesfully deleted flavor");
})

export default router