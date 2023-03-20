import {db} from "../database.js"

//Get all sizes
export async function getSizes() {
    const sql = "select * from Cake_Size";
    const [results] = await db.query(sql);

    return results
}

// Get a Size by ID
export async function getSizeById(id) {
    const sql = `
      select *
      from Cake_Size
      where typeID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  // Create a size
export async function createSize(type, price, status) {
    const sql = `
      insert into Cake_Size (type, price, status)
      values (?, ?, ?)
    `;
    const [result] = await db.query(sql, [type, price, status]);
    const id = result.insertId;
  
    return getSizeById(id);
  }

  // Update a size by id
export async function updateSizeById(id, price, status) {
    const sql = `
      update Cake_Size
      set price = ?,
      status = ?
      where typeID = ?
    `;
    const [result] = await db.query(sql, [price, status, id]);
    
    return getSizeById(id);
  }

  // Update a sizes's status -> NO hard deletes
export async function updateSizeStatusById(id, status) {
    const sql = `
      update Cake_Size
      set status = ?
      where typeID = ?
    `;
    const [result] = await db.query(sql, [status, id]);
  
    return getSizeById(id);
  }