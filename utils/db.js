// const { Pool } = require('pg');
// convert above to import
import pg from "pg";
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mujlinkedin',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;
