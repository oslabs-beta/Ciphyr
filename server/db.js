const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

module.exports = pool; 


// INSERT INTO log ( timestamp, size, type, depth, log, user )