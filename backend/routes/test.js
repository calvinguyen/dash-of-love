import express from "express"
import { 
    getTests, getTestById, createTest, updateTestById, deleteTestById 
} from "../controllers/test.js"

const router = express.Router()

// Get all rows from testing 
router.get("/", async (req, res) => {
    const tests = await getTests()

    res.json(tests);
})

// Get test from testing by id
router.get("/:id", async (req, res) => {
    const testingId = req.params.id;
    const data = await getTestById(testingId);

    res.json(data);
})

// Create a test entry to testing
router.post("/", async (req, res) => {
    const {name, price} = req.body;
    
    const test = await createTest(name, price);
    res.json(test);
})

// Update a test
router.put("/:id", async (req, res) => {
    const {name, price} = req.body;
    const testingId = req.params.id;

    const result = await updateTestById(testingId, name, price);
    res.json(result);
})

// Delete a test
router.delete("/:id", async (req, res) => {
    const testingId = req.params.id;
    const result = await deleteTestById(testingId);

    res.json("Succesfully deleted test");
})

export default router