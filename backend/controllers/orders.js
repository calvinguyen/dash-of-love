import {db} from "../database.js"

// Get all orders
export async function getOrders() {
    const sql = "select * from `Order`";
    const [results] = await db.query(sql);
  
    return results
}

// Get a order by id
export async function getOrderById(id) {
    const sql = `
      select *
      from \`Order\`
      where orderID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Create a order
export async function createOrder(customerID, cakesID, referralID, details, desiredDate) {
    const sql = `
      insert into \`Order\` (customerID, cakesID, referralID, details, desired_date)
      values (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [customerID, cakesID, referralID, details, desiredDate]);
    const id = result.insertId;
  
    return getOrderById(id);
}

// Update an order's status by id
export async function updateOrderStatusById(orderID, status) {
    const sql = `
      update \`Order\`
      set statusID = ?
      where orderID = ?
    `;
    const [result] = await db.query(sql, [status, orderID]);
    
    return getOrderById(orderID);
}