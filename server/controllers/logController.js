const db = require('../db');
const logController = {};

logController.getAllLog = async (req, res, next) => {
  try {
    // retrieve logs from api key provided
    const { apiKey } = req.body;
    const logQuery = `SELECT * FROM Log WHERE api_key = '${apiKey}'`;
    const clientLog = await db.query(logQuery);
    res.locals.allLog = clientLog.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

logController.newLogInfo = async (req, res, next) => {
  try {
    const username = req.cookies.username;
    // retrieve logs from api key provided
    const logCountQuery = `SELECT COUNT(*) FROM log l JOIN instance i ON l.api_key = i.api_key
      JOIN clients c ON i.client_id = c.client_id 
      WHERE c.username = '${username}' AND l.timestamp > c.last_logout`;
      logCount = await db.query(logCountQuery);
    res.locals.logCount = logCount.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

/*
logController.getSuspiciousLog = async (req, res, next) => {
  try {
    const { apiKey } = req.body;
    const suspiciousQuery = `SELECT id, depth, latency FROM Log where api_key = '${apiKey}'`;
    const suspiciousLog = await db.query(suspiciousQuery);
    res.locals.suspiciousLog = clientLog.rows;
    return next();
  } catch(err) {
    return next(err);
  }
}
*/

module.exports = logController;
