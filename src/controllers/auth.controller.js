import { response, request } from "express"
import { v4 as uuidv4 } from "uuid"
import dotenv from 'dotenv'
import bcryptjs from "bcryptjs";

import { pool } from "../database/config.js"

dotenv.config()



export const register = async (req = request, res = response) => {
    try {
        const { name, email, password } = req.body;
        const query = 'INSERT INTO "User" (id, name, email, password) VALUES ($1, $2, $3, $4)';

        //password encryption
        const salt = bcryptjs.genSaltSync();
        const encryptedPassword = bcryptjs.hashSync(password, salt);

        const result = await pool.query(query, [uuidv4(), name, email, encryptedPassword]);
        res.json({
            user: {
                msg: 'User created',
                name,
                email
            }
        })
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}


export const login = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;
        

        const query = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
            if (newUser.rows.length > 0) {
                throw new Error(`This email already exists`);
            }

        const newUser = await pool.query('SELECT * FROM "User" WHERE email = $1 AND password = $2', [email, password]);
        const {name, role} = newUser.rows[0];
        res.json({
            msg: 'Successful',
            name,
            role
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
}
