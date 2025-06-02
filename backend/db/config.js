import pg from 'pg';
import {isProd} from '../queries/helperFunctions.js'

const { Pool } = pg;

const pool = new Pool(
    {
        connectionString: process.env.DB_URL,
        ssl: isProd() ? { rejectUnauthorized: true } : false

    }
);

export default pool;
