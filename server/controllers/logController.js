const db = require('../db');

const logController = {};

logController.getAllLog = async (req, res, next) => {
  try {
    // later with API key, the condition should check id = API key
    // join with instance table

    // Extension: when the client selected an instance from the dropdown menu
    //select api_key according to the instance_id selected
    // if api_key matches with api_key from user input
      // display query logs
    // else return an error message
    console.log('hi in getall logs');
    const { apiKey } = req.body
    console.log('apiKey', apiKey);
    const logQuery = `SELECT * FROM Log WHERE api_key = '${apiKey}'`;
    const clientLog = await db.query(logQuery);
    console.log('after query');
    console.log('clientLog', clientLog);
    res.locals.allLog = clientLog.rows;
    console.log(res.locals.allLog)
    // console.log(await db.query(`SELECT * FROM clients`));
    return next();
  }
  catch(err) {
    return next(err);
  }
}

module.exports = logController;