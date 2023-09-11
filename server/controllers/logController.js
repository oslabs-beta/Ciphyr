const logController = {};
const db = require('../db');

// create a function to generate api key
//look into JWT token for api key
// user can have label for instance
// default a date.now() for the instance

// not sure about if we need this
// logController.verifyClient = async (req, res, next) => {
//     try {
//     const { input } = req.body;
//     const apikeySearch = `SELECT * FROM instance WHERE api_key = '${input}'`;
//     const apiKey = await db.query(apikeySearch);
//     if (apiKey.rowCount > 0) {
      
//     }

//     }
//     catch(err) {
//       return next(err);
//     }
// }

logController.getAllLog = async (req, res, next) => {
  try {
    // later with API key, the condition should check id = API key
    // join with instance table
    
    const logQuery = `SELECT * FROM Log WHERE id = '1'`;
    const clientLog = await db.query(logQuery);
    res.locals.allLog = clientLog.rows;
    console.log(res.locals.allLog)
    console.log(await db.query(`SELECT * FROM clients`));
    return next();
  }
  catch(err) {
    return next(err);
  }
}

module.exports = logController;