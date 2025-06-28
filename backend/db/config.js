const pg = require('pg');
const { isProd } = require('../utils/helpers');

const { Pool } = pg;

const pool = new Pool(
    {
        connectionString: process.env.DB_URL,
        ssl: isProd() ? { rejectUnauthorized: false } : false
    }
);

module.exports = pool;
