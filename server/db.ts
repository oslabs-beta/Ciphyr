import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URI,
});


//this is needed to use the query method for SQL DB
const db = {
  query: (text: any, params: any, callback: any) => {
    return pool.query(text, params, callback);
  },
};

export default db