const db = require('../db');
const logController = {};

logController.getAllLog = async (req, res, next) => {
  try {
    // retrieve logs from api key provided
    const { apiKey, timezone } = req.body;
    console.log(apiKey)
    console.log(timezone)
    const logQuery = `SELECT * FROM Log WHERE api_key = '${apiKey}'`;
    const clientLogResult = await db.query(logQuery);
    const clientLog = clientLogResult.rows;


    //console.log(clientLogResult.rows[0].timestamp.toLocaleString('en-US', { timeZone: timeZone }))
    //convert timestamp (JS date object) to string with specific format option
    if (timezone) {
      clientLog.forEach(el => {
        el.timestamp = el.timestamp.toLocaleString('en-US', { hour12: false, timeZone: timezone }).replace(',', '')
        //console.log(el.timestamp);
      })
    }
    console.log('loggg', clientLog)
    res.locals.allLog = clientLog

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

module.exports = logController;
