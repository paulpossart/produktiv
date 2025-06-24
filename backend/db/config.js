import pg from 'pg';
import { isProd } from '../utils/helpers.js';

const { Pool } = pg;

const pool = new Pool(
    {
        connectionString: process.env.DB_URL,
        ssl: isProd() ? { rejectUnauthorized: false } : false
    }
);

export default pool;

