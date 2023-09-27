const db = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const instanceController = {};

instanceController.verifyToken = async (req, res, next) => {


  const jwtToken = req.cookies.token;
  jwt.verify(jwtToken, process.env.TOKEN_SECRET, (err, user) => {

    if (err) return res.sendStatus(403)

    res.locals.client = user;
    console.log('res locals jwt payload', res.locals.client);
    return next();
  })
}

instanceController.createInstance = async (req, res, next) => {
  try {
    const {label} = req.body;
    if (!label) {
      res.locals.instance = { message : 'Label required'};
      return next();
    } else {
      const labelQuery = `SELECT * FROM instance WHERE label = '${label}'`;
      const labelTaken = await db.query(labelQuery);
      // if table is not empty, then check if label is duplicated

      // add: allow different user to use same label
      if (labelTaken.rowCount !== 0) {
        if (labelTaken.rows[0].label === label) {
          res.locals.instance = {message : 'Please use new label'};
          return next();
        }
      }
    }
    const id = res.locals.client.client_id;
    const apiKey = crypto.randomUUID();
    const instanceQuery = `INSERT INTO instance (label, api_key, client_id) VALUES ( '${label}', '${apiKey}','${id}')`;
    const newInstance = await db.query(instanceQuery);
    // send back api key to user once after creation
    res.locals.instance = { message: 'New instance created', apiKey: apiKey};
    return next();
  }

  catch(err) {
    return next(err)
  }
}

instanceController.getInstances = async (req, res, next) => {
  const jwtToken = req.cookies.token;
  // retrieve instances based the clien_id in JWT token
  jwt.verify(jwtToken, process.env.TOKEN_SECRET, async (err, user) => {

    if (err) return res.sendStatus(403)

    const instanceQuery = `SELECT * FROM instance WHERE client_id = '${user.client_id}';`
    const instanceResult = await db.query(instanceQuery);
    res.locals.showInstance = instanceResult.rows;

    return next();
  })
}

instanceController.deleteInstance = async (req, res, next) => {
  try {
    const { id }  = req.body;
    const deleteQuery = `DELETE FROM instance WHERE id = ${id}`;
    const result = await db.query(deleteQuery);
    return next();
  }
  catch(err) {
    return next(err);
  }
}

instanceController.changeTimeZone = async (req, res, next) => {
  try {
    const { timeZone } = req.body;
    console.log(timeZone)
    const timeZoneQuery = `ALTER DATABASE sgobvnzo SET TIMEZONE TO '${timeZone}';`
    const result = await db.query(timeZoneQuery);
    return next();
  }
  catch(err) {
    console.log(err)
    return next(err);
  }
}

module.exports = instanceController;