import {db} from "../database.js"

// Get all Menu cake flavors
export async function getMenu() {
    const sql = "select * from Product_Menu";
    const [results] = await db.query(sql);
  
    return results
}

// Get specific cake type and flavor by id on menu 
export async function getMenuItemById(id) {
    const sql = `
      select *
      from Product_Menu
      where cakesID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Get all flavors offered for a specific cake type by typeid
export async function getFlavorsOfferedByCakeType(typeID) {
    const sql = `
        select Product_Menu.cakesID, Product_Menu.typeID, Product_Menu.flavorID,
        Cake_Flavor.flavor, Product_Menu.statusID
        from Product_Menu
        inner join Cake_Flavor 
        on Product_Menu.flavorID = Cake_Flavor.flavorID
        where typeID = ?
    `;
    const [rows] = await db.query(sql, [typeID]);
    return rows;
}

// Get all cake types offered for a specific flavor by flavorid
export async function getCakeTypesOfferedByFlavor(flavorID) {
    const sql = `
        select Product_Menu.cakesID, Product_Menu.typeID, Cake_Type.type,
        Product_Menu.flavorID, Product_Menu.statusID
        from Product_Menu
        inner join Cake_Type 
        on Product_Menu.typeID = Cake_Type.typeID
        where flavorID = ?;
    `;
    const [rows] = await db.query(sql, [flavorID]);
    return rows;
}

// Assign a flavor to cake type
export async function assignFlavorToCake(typeID, flavorID) {
    const sql = `
      insert into Product_Menu (typeID, flavorID)
      values (?, ?)
    `;
    const [result] = await db.query(sql, [typeID, flavorID]);
    const id = result.insertId;
  
    return getMenuItemById(id);
}

// Update a menu item's status
export async function updateMenuItemStatus(cakesID, statusID) {
    const sql = `
      update Product_Menu
      set statusID = ?
      where cakesID = ?
    `;
    const [result] = await db.query(sql, [statusID, cakesID]);
  
    return getMenuItemById(cakesID);
}

// Get all Active Menu FLavors
export async function getActiveMenuFlavors() {
    const sql = `
        select Product_Menu.cakesID, Product_Menu.typeID, Product_Menu.flavorID, Cake_Flavor.flavor
        from Product_Menu
        inner join Cake_Type
        on Product_Menu.typeID = Cake_Type.typeID
        inner join Cake_Flavor
        on Product_Menu.flavorID = Cake_Flavor.flavorID
        where Product_Menu.statusID = 1
        and Cake_Type.statusID = 1
        and Cake_Flavor.statusID = 1
    `;
    const [results] = await db.query(sql);
  
    return results
}

// Get all Active Menu Types
export async function getActiveMenuTypes() {
    const sql = `
        select Cake_Type.typeID, Cake_Type.type, Cake_Type.price
        from Product_Menu
        inner join Cake_Type
        on Product_Menu.typeID = Cake_Type.typeID
        inner join Cake_Flavor
        on Product_Menu.flavorID = Cake_Flavor.flavorID
        where Product_Menu.statusID = 1
        and Cake_Type.statusID = 1
        and Cake_Flavor.statusID = 1
        group by Cake_Type.typeID
    `;
    const [results] = await db.query(sql);
  
    return results
}