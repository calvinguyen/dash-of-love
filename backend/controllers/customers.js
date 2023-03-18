import {db} from "../database.js"

//Get all customers
export async function getCustomers() {
    const sql = "select * from Customer";
    const [results] = await db.query(sql);

    return results
}