import pkg from 'pg';
const { Pool } = pkg;

const PG_URI = process.env.SQL_DB;

const pool = new Pool({
  connectionString: PG_URI,
});

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
