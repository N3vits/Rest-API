import bcryptjs from "bcryptjs";

import { pool } from "../database/config.js";

export const checkEmail = async (email) => {
  const newUser = await pool.query('SELECT * FROM "User" WHERE email = $1', [
    email,
  ]);
  if (newUser.rows.length > 0) {
    throw new Error(`This email already exists`);
  }
};

export const passwordValidation = async (email, password) => {
  const query = await pool.query('SELECT * FROM "User" WHERE email = $1', [
    email,
  ]);
  console.log(query.rows[0].password);
  const isPassword = bcryptjs.compareSync(password, query.rows[0].password);
  if (!isPassword) {
    return true;
  }
  return false;
};
