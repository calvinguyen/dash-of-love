import {db} from "../database.js"

//Get all invoices
export async function getInvoices() {
    const sql = "select * from Invoice";
    const [results] = await db.query(sql);

    return results
}

// Get a Invoice by ID
export async function getInvoiceById(id) {
    const sql = `
      select *
      from Invoice
      where invoiceID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

// Create a invoice
export async function createInvoice(customerID, orderID, status) {
    const sql = `
      insert into Invoice (customerID, orderID, status)
      values (?, ?, ?)
    `;
    const [result] = await db.query(sql, [customerID, orderID, status]);
    const id = result.insertId;
  
    return getInvoiceById(id);
  }

// Update a invoice by id
export async function updateInvoiceById(id, customerID, orderID, status) {
    const sql = `
      update Invoice
      set customerID = ?,
      orderID = ?,
      status = ?
      where invoiceID = ?
    `;
    const [result] = await db.query(sql, [customerID, orderID, status, id]);
    
    return getInvoiceById(id);
  }

// Update a invoice's status -> NO hard deletes
export async function updateInvoiceStatusById(id, status) {
    const sql = `
      update Invoice
      set status = ?
      where invoiceID = ?
    `;
    const [result] = await db.query(sql, [status, id]);
  
    return getInvoiceById(id);
  }