import {db} from "../database.js"

// Get all requests
export async function getRequests() {
    const sql = "select * from Request";
    const [results] = await db.query(sql);
  
    return results
}

// Get a request by id
export async function getRequestById(id) {
    const sql = `
      select *
      from Request
      where orderID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Create a request
export async function createRequest(customerID, orderDate, cakesID, referralID, details) {
    const sql = `
      insert into Request (customerID, order_date, cakesID, referralID, details)
      values (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [customerID, orderDate, cakesID, referralID, details]);
    const id = result.insertId;
  
    return getRequestById(id);
}

// Update an order's status by id
export async function updateRequestStatusById(orderID, status) {
    const sql = `
      update Request
      set status = ?
      where orderID = ?
    `;
    const [result] = await db.query(sql, [status, orderID]);
    
    return getRequestById(orderID);
}