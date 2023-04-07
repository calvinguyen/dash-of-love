import {db} from "../database.js"

// Get count of orders by month
export async function getOrdersByMonth() {
  const sql = "select * from monthly_order_view";
  const [results] = await db.query(sql);

  return results
}
// Get count of orders by year
export async function getMonthlyOrdersByYear(year) {
  const sql = `
    select * from monthly_order_view
    where Order_Year = ?
  `;
  const [results] = await db.query(sql, [year]);

  return results
}

// Get count of referrals from orders
export async function getReferralsFromOrders() {
  const sql = "select * from order_referral_view";
  const [results] = await db.query(sql);

  return results
}

// Get count of orders by month
export async function getMonthlyOrderStatuses() {
    const sql = "select * from month_order_status_view";
    const [results] = await db.query(sql);
  
    return results
}

// Get completed orders
export async function getCompletedOrders() {
    const sql = "select * from completed_order_view";
    const [results] = await db.query(sql);
  
    return results
}


export async function getOrderPickUps() {
    const sql = "select * from order_pickup_view";
    const [results] = await db.query(sql);
  
    return results
}