import { response, request } from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

import { pool } from "../database/config.js";
import { passwordValidation } from "../helpers/validations.js";
import { generateJWT } from "../helpers/generateJWT.js";

dotenv.config();

export const register = async (req = request, res = response) => {
  try {
    const { name, email, password } = req.body;
    const query =
      'INSERT INTO "User" (id, name, email, password) VALUES ($1, $2, $3, $4)';

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    const result = await pool.query(query, [
      uuidv4(),
      name,
      email,
      encryptedPassword,
    ]);
    res.json({
      user: {
        msg: "User created",
        name,
        email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const query = await pool.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);

    if (query.rows.length <= 0) {
      return res.status(400).json({
        msg: `this email does not exist`,
      });
    }

    const isPassword = await passwordValidation(email, password);
    if (isPassword) {
      return res.status(400).json({
        msg: "Incorrect password",
      });
    }

    const token = await generateJWT(query.rows[0].id);

    res.json({
      msg: "Successful",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
