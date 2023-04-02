import {db} from "../database.js"

//Get all types
export async function getTypes() {
    const sql = "select * from Cake_Type";
    const [results] = await db.query(sql);

    return results
}

// Get a type by ID
export async function getTypeById(id) {
    const sql = `
      select *
      from Cake_Type
      where typeID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Create a type
export async function createType(type, price, status) {
    const sql = `
      insert into Cake_Type (type, price, statusID)
      values (?, ?, ?)
    `;
    const [result] = await db.query(sql, [type, price, status]);
    const id = result.insertId;
  
    return getTypeById(id);
}

// Update a type by id
export async function updateTypeById(id, type, price, status) {
    const sql = `
      update Cake_Type
      set type = ?,
      price = ?,
      statusID = ?
      where typeID = ?
    `;
    const [result] = await db.query(sql, [type, price, status, id]);
    
    return getTypeById(id);
}

// Update a type's status -> NO hard deletes
export async function updateTypeStatusById(id, status) {
    const sql = `
      update Cake_Type
      set statusID = ?
      where typeID = ?
    `;
    const [result] = await db.query(sql, [status, id]);
  
    return getTypeById(id);
}

//Get Types with status descriptions
export async function getTypesWithDesc() {
    const sql = `
        select Cake_Type.typeID, Cake_Type.type, Cake_Type.price,
        Cake_Type.statusID, Cake_Type_Status.description
        from Cake_Type 
        inner join Cake_Type_Status
        on Cake_Type.statusID = Cake_Type_Status.statusID;
    `;
    const [results] = await db.query(sql);

    return results
}

//Get all types
export async function getStatusDesc() {
    const sql = "select * from Cake_Type_Status";
    const [results] = await db.query(sql);

    return results
}

//Get flavors that are NOT assigned to cake type
export async function getFlavorsNotAssigned(typeID) {
    const sql = `
        select * from Cake_Flavor
        where flavorID not in 
        (
            select flavorID from Product_Menu
            where typeID = ?
        )
    `;
    const [results] = await db.query(sql, [typeID]);

    return results
}