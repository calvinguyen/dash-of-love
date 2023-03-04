import {db} from "../database.js"
import express from "express"

const router = express.Router()

// Get all rows from testing 
router.get("/", async (req, res) => {
    const sql = "SELECT * FROM testing";
    const [tests] = await db.query(sql);

    res.json(tests);
})

// Get test from testing by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT *
        FROM testing
        WHERE testingId = ?
    `;
    const [rows] = await db.query(sql, [id]);
    const data = rows[0];
    res.json(data);
})

// Create a test entry to testing
router.post("/", async (req, res) => {
    const sql = `
        INSERT INTO testing (name, price)
        VALUES (?, ?)
    `;
    
    const name = req.body.name;
    const price = req.body.price;
    

    const [result] = await db.query(sql, [name, price]);
    return res.json("Successfully created test");
})

/* async function createTestingEntry(testing_name) {
    const [result] = await db.query(`
    INSERT INTO testing (testing_name)
    VALUES (?)
    `, [testing_name]);

    const id = result.insertId
    return console.log(await getTestingById(id))

} */
// createTestingEntry("Hello From Backend Again")
// const rows = await getTestingTable()
// console.log(rows)

// Update a test
//!TODO: Need to test in postman
router.put("/:id", async (req, res) => {
    const sql = `
        UPDATE testing
        SET 
        name = ?,
        price = ?
        WHERE testingId =?
    `;

    const name = req.body.name;
    const price = req.body.price;
    const testingId = req.params.id;

    const [results] = await db.query(sql, [name, price, testingId]);
    return res.json("Successfully updated test");
})

// Delete a test
//!TODO: Need to test in postman
router.delete("/:id", async (req, res) => {
    const sql = "DELETE FROM testing WHERE testingId = ?";
    const testingId = req.params.id;

    const [result] = await db.query(sql, [testingId]);
    return res.json("Succesfully deleted test");
})

export default router