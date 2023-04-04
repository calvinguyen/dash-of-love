import {db} from "../database.js"

// Get all orders by month
export async function getOrdersByMonth() {
  const sql = "select * from monthly_order_view";
  const [results] = await db.query(sql);

  return results
}