import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../database/config.js";

const jwt = jsonwebtoken;
dotenv.config();

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
    try {

        const {id} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await pool.query('SELECT * FROM "User" WHERE id = $1', [
            id,
          ]);
        
        if(user.rows.length <= 0){
            return res.status(401).json({
                msg: 'Token not valid - User not found'
            })
        }
        
        req.user = user.rows[0];
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
}