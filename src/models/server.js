
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan';


import { router as auth } from '../routes/auth.routes.js';
import { pool } from '../database/config.js';

dotenv.config()

export class Server {


    constructor() {
        this.app = express();

        //Connection to database
        this.connection();

        //Middlewares
        this.middleware();

        //Routing
        this.routing();
    }


    routing(){
        this.app.use('/api/auth', auth)
    }

    middleware(){
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(cors())
    }


    async connection() {
        try {
            await pool.connect();
            console.log('Database is connect');
        } catch (err) {
            throw new Error(err);
        }
    }

    listing() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server listing on port', process.env.PORT);
        })
    }
}