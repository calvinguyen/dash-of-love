import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const db = mysql.createPool(process.env.DATABASE_URL).promise()

async function getTestingTable() {
    const [rows] = await db.query("SELECT * FROM testing")
    return rows
}

async function getTestingById(id) {
    const [rows] = await db.query(`
        SELECT * 
        FROM testing
        where testing_id = ?
        `, [id])
    return rows[0]
}

const testing = await getTestingById(1)
console.log(testing)