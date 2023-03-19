import {db} from "../database.js"

// Get all Menu cake flavors
export async function getMenu() {
    const sql = "select * from Menu";
    const [results] = await db.query(sql);
  
    return results
}

// Get specific cake type and flavor by id on menu 
export async function getMenuItemById(id) {
    const sql = `
      select *
      from Menu
      where cakesID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Get all flavors offered for a specific cake type by typeid
export async function getFlavorsOfferedByCakeType(typeID) {
    const sql = `
      select *
      from Menu
      where typeID = ?
    `;
    const [rows] = await db.query(sql, [typeID]);
    return rows;
}

// Get all cake types offered for a specific flavor by flavorid
export async function getCakeTypesOfferedByFlavor(flavorID) {
    const sql = `
      select *
      from Menu
      where flavorID = ?
    `;
    const [rows] = await db.query(sql, [flavorID]);
    return rows;
}

// Assign a flavor to cake type
export async function assignFlavorToCake(typeID, flavorID) {
    const sql = `
      insert into Menu (typeID, flavorID)
      values (?, ?)
    `;
    const [result] = await db.query(sql, [typeID, flavorID]);
    const id = result.insertId;
  
    return getMenuItemById(id);
}

// Delete a cake type to flavor assignment
export async function removeCakeFlavorAssignment(cakesID) {
    const sql = `
      delete from Menu
      where cakesID = ?
    `;
    const [result] = await db.query(sql, [cakesID]);
  
    return result;
}