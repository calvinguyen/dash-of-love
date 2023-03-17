import {db} from "../database.js"

// Get all flavors
export async function getFlavors() {
  const sql = "select * from Cake_Flavor";
  const [results] = await db.query(sql);

  return results
}

// Get a flavor by id
export async function getFlavorById(id) {
  const sql = `
    select *
    from Cake_Flavor
    where flavorID = ?
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

// Create a flavor
export async function createFlavor(flavor, status) {
  const sql = `
    insert into Cake_Flavor (flavors, status)
    values (?, ?)
  `;
  const [result] = await db.query(sql, [flavor, status]);
  const id = result.insertId;

  return getFlavorById(id);
}

// Update a flavor by id
export async function updateFlavorById(id, flavor, status) {
  const sql = `
    update Cake_Flavor
    set flavors = ?,
    status = ?
    where flavorID = ?
  `;
  const [result] = await db.query(sql, [flavor, status, id]);
  
  return getFlavorById(id);
}

// Update a flavor's status -> NO hard deletes
export async function updateFlavorStatusById(id, status) {
  const sql = `
    update Cake_Flavor
    set status = ?
    where flavorID = ?
  `;
  const [result] = await db.query(sql, [status, id]);

  return getFlavorById(id);
}