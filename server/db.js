const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URI,
});


//this is needed to use the query method for SQL DB
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

