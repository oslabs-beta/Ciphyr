const db = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const instanceController = {};

instanceController.verifyToken = async (req, res, next) => {
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  // if (token == null) return res.sendStatus(401)
  
  const jwtToken = req.cookies.token;
  // const token = res.locals.result.jwt;
  jwt.verify(jwtToken, process.env.TOKEN_SECRET, (err, user) => {

    // how to use the status code properly?
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
    //const hashedToken = await bcrypt.hash(token, salt)
    const instanceQuery = `INSERT INTO instance (label, api_key, client_id) VALUES ( '${label}', '${apiKey}','${id}')`;
    const newInstance = await db.query(instanceQuery);
    res.locals.instance = { message: 'New instance created'};
    // add: send back the api key when created
    return next();
  }
  
  catch(err) {
    return next(err)
  }
}

module.exports = instanceController;