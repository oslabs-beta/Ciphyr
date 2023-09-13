const db = require('../db');

<<<<<<< HEAD
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
=======
const logController = {};
>>>>>>> e994e4c5d5fc741363dbda67598f07582f006fca

logController.getAllLog = async (req, res, next) => {
  try {
    // later with API key, the condition should check id = API key
    // join with instance table

    // Extension: when the client selected an instance from the dropdown menu
    // select api_key according to the instance_id selected
    // if api_key matches with api_key from user input
      // display query logs
    // else return an error message
    const { apiKey } = req.body
    const logQuery = `SELECT * FROM Log WHERE api_key = '${apiKey}'`;
    const clientLog = await db.query(logQuery);
    res.locals.allLog = clientLog.rows;
<<<<<<< HEAD
    console.log('RES.LOGS:', res.locals.allLog)
    // console.log(await db.query(`SELECT * FROM clients`));
=======
>>>>>>> e994e4c5d5fc741363dbda67598f07582f006fca
    return next();
  }
  catch(err) {
    return next(err);
  }
}

module.exports = logController;