
import { pool } from "../database/config.js"

export const checkEmail = async (email) =>{
    const newUser = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (newUser.rows.length > 0) {
        throw new Error(`This email already exists`);
    }
}