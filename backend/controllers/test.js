import {db} from "../database.js"

export async function getTests() {
  const sql = "select * from testing";
  const [results] = await db.query(sql);

  return results
}

export async function getTestById(id) {
  const sql = `
    select *
    from testing
    where testingId = ?
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

export async function createTest(name, price) {
  const sql = `
    insert into testing (name, price)
    values (?, ?)
  `;
  const [result] = await db.query(sql, [name, price]);
  const id = result.insertId;

  return getTestById(id);
}

export async function updateTestById(id, name, price) {
  const sql = `
    update testing
    set name = ?,
    price = ?
    where testingId = ?
  `;
  const [result] = await db.query(sql, [name, price, id]);
  
  return getTestById(id);
}

export async function deleteTestById(id) {
  const sql = `
    delete from testing
    where testingId = ?
  `;
  const [result] = await db.query(sql, [id]);

  return result
}