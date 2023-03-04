import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const db = mysql.createPool(process.env.DATABASE_URL).promise()




async function getTestingTable() {
    const [rows] = await db.query("SELECT * FROM testing")
    return rows
}
// const rows = await getTestingTable()
// console.log(rows)

async function getTestingById(id) {
    const [rows] = await db.query(`
        SELECT * 
        FROM testing
        where testing_id = ?
        `, [id])
    return rows[0]
}
// const testing = await getTestingById(1)
// console.log(testing)

async function createTestingEntry(testing_name) {
    const [result] = await db.query(`
    INSERT INTO testing (testing_name)
    VALUES (?)
    `, [testing_name]);

    const id = result.insertId
    return console.log(await getTestingById(id))

}
// createTestingEntry("Hello From Backend Again")
// const rows = await getTestingTable()
// console.log(rows)

export {db};