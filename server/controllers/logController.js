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
