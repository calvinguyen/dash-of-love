import {db} from "../database.js"

// Get all flavors
export async function getFlavors() {
  const sql = "select * from flavors";
  const [results] = await db.query(sql);

  return results
}

// Get a flavor by id
export async function getFlavorById(id) {
  const sql = `
    select *
    from flavors
    where flavor_id = ?
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

// Create a flavor
export async function createFlavor(flavor) {
  const sql = `
    insert into flavors (flavor)
    values (?)
  `;
  const [result] = await db.query(sql, [flavor]);
  const id = result.insertId;

  return getFlavorById(id);
}

// Update a flavor by id
export async function updateFlavorById(id, flavor) {
  const sql = `
    update flavors
    set flavor = ?
    where flavor_id = ?
  `;
  const [result] = await db.query(sql, [flavor, id]);
  
  return getFlavorById(id);
}

// Delete a flavor by id
export async function deleteFlavorById(id) {
  const sql = `
    delete from flavors
    where flavor_id = ?
  `;
  const [result] = await db.query(sql, [id]);

  return result
}