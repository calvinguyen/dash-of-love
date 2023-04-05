import {db} from "../database.js"

// Get all referrals
export async function getReferrals() {
    const sql = "select * from Referral_Source order by referralID";
    const [results] = await db.query(sql);
  
    return results
}

// Get a referral by id
export async function getReferralById(id) {
    const sql = `
      select *
      from Referral_Source
      where referralID = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

// Create a referral
export async function createReferral(type) {
    const sql = `
      insert into Referral_Source (type)
      values (?)
    `;
    const [result] = await db.query(sql, [type]);
    const id = result.insertId;
  
    return getReferralById(id);
}

// Update a flavor by id
export async function updateReferralById(id, type) {
    const sql = `
      update Referral_Source
      set type = ?
      where referralID = ?
    `;
    const [result] = await db.query(sql, [type, id]);
    
    return getReferralById(id);
}

//!TODO: Possibly update a referral's status OR delete