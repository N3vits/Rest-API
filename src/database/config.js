import pkg from 'pg';
import dotenv from 'dotenv'
const { Pool } = pkg;
dotenv.config();

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
});



