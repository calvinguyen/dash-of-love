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
    insert into Cake_Flavor (flavor, statusID)
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
    set flavor = ?,
    statusID = ?
    where flavorID = ?
  `;
  const [result] = await db.query(sql, [flavor, status, id]);
  
  return getFlavorById(id);
}

// Update a flavor's status -> NO hard deletes
export async function updateFlavorStatusById(id, status) {
  const sql = `
    update Cake_Flavor
    set statusID = ?
    where flavorID = ?
  `;
  const [result] = await db.query(sql, [status, id]);

  return getFlavorById(id);
}

//Get Flavors with status descriptions
export async function getFlavorsWithDesc() {
    const sql = `
        select Cake_Flavor.flavorID, Cake_Flavor.flavor,
        Cake_Flavor.statusID, Cake_Flavor_Status.description
        from Cake_Flavor 
        inner join Cake_Flavor_Status
        on Cake_Flavor.statusID = Cake_Flavor_Status.statusID;
    `;
    const [results] = await db.query(sql);

    return results
}

//Get all status desc
export async function getStatusDesc() {
    const sql = "select * from Cake_Flavor_Status";
    const [results] = await db.query(sql);

    return results
}

// Get all CakeTypes not assigned to a flavor
export async function getTypesNotAssigned(id) {
    const sql = `
        select * from Cake_Type
        where typeID not in 
        (
            select typeID from Product_Menu
            where flavorID = ?
        )
    `;
    const [rows] = await db.query(sql, [id]);
    return rows;
}