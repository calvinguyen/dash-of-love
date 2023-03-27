import {db} from "../database.js"

//Get all customers
export async function getCustomers() {
    const sql = "select * from Customer";
    const [results] = await db.query(sql);

    return results
}

// Get a customer by ID
export async function getCustomerById(id) {
    const sql = `
      select *
      from Customer
      where customerID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Get a customer by email
export async function getCustomerByEmail(email) {
    const sql = `
      select *
      from Customer
      where email = ?
    `;
    const [rows] = await db.query(sql, [email]);
    return rows[0];
}

// Create a customer
export async function createCustomer(first_name, last_name, email, phone) {
    const sql = `
      insert into Customer (first_name, last_name, email, phone)
      values (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [first_name, last_name, email, phone]);
    const id = result.insertId;
  
    return getCustomerById(id);
}

// Update a customer by id
export async function updateCustomerById(id, first_name, last_name, email, phone, status) {
    const sql = `
      update Customer
      set first_name = ?, last_name = ?, email = ?,
      phone = ?, statusID = ?
      where customerID = ?
    `;
    const [result] = await db.query(sql, [first_name, last_name, email, phone, status, id]);
    
    return getCustomerById(id);
}
  
// Update a customer status -> NO hard deletes
export async function updateCustomerStatusById(id, status) {
  const sql = `
    update Customer
    set statusID = ?
    where customerID = ?
  `;
  const [result] = await db.query(sql, [status, id]);

  return getCustomerById(id);
}