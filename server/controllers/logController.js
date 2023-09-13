const db = require('../db');

const logController = {};

logController.getAllLog = async (req, res, next) => {
  try {
    // later with API key, the condition should check id = API key
    // join with instance table

    // Extension: when the client selected an instance from the dropdown menu
    // select api_key according to the instance_id selected
    // if api_key matches with api_key from user input
    // display query logs
    // else return an error message
    const { apiKey } = req.body;
    const logQuery = `SELECT * FROM Log WHERE api_key = '${apiKey}'`;
    const clientLog = await db.query(logQuery);
    res.locals.allLog = clientLog.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = logController;
