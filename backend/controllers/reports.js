import {db} from "../database.js"

// Get count of orders by month
export async function getOrdersByMonth() {
  const sql = "select * from monthly_order_view";
  const [results] = await db.query(sql);

  return results
}

// Get count of referrals from orders
export async function getReferralsFromOrders() {
  const sql = "select * from order_referral_view";
  const [results] = await db.query(sql);

  return results
}