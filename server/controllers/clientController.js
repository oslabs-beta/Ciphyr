const userController = {};
const bcrypt = require('bcrypt');
const db = require('../db');
const salt = 10;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


userController.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.locals.newClient = { message: 'All input fields required'};
      return next();
    }
    let hashedPassword = await bcrypt.hash(password, salt);

    const usernameQuery = `SELECT * FROM clients WHERE username = '${username}'`;
    const emailQuery = `SELECT * FROM clients WHERE email = '${email}';`;
    const usernameResult = await db.query(usernameQuery);
    const emailResult = await db.query(emailQuery);
 
    if (emailResult.row) {
      res.locals.newClient = { message: 'Email already in use' };
    } else if (usernameResult.row) {
      res.locals.newClient = { message: 'Username already exist' };
    } else {
      const createQuery = `INSERT INTO clients ( username, password, email) VALUES ('${username}','${hashedPassword}','${email}');`
      const create = await db.query(createQuery);
      console.log('creating new client', create);
      res.locals.newClient = { message: 'Client created' };
    }
    return next();
  } catch (err) {
    return next(err);
  }
};


userController.login = async (req, res, next) => {
  try {
    // input takes username or email
    const { input, password } = req.body;
    const passwordQuery = `SELECT client_id, password FROM clients WHERE username = '${input}' OR email = '${input}';`;
    const passwordResult = await db.query(passwordQuery);
    const clientID = passwordResult.rows[0].client_id;

    const verified = await bcrypt.compare(password, passwordResult.rows[0].password);

    if (!verified) {
      res.locals.result = {verified: verified, message: "You do not have access, please try again"}
    } else {
      const jwtToken = jwt.sign({client_id: clientID}, process.env.TOKEN_SECRET);
      
      res.cookie('token', jwtToken, { httpOnly: true, secure: true });
      //res.locals.result = {verified: verified, message: "login successfully", jwt: jwtToken}
      res.locals.result = {verified: verified, message: "login successfully"}
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

// Entension: save JWT in cookie(http only) and access it from there

userController.verifyToken = async (req, res, next) => {
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

userController.createInstance = async (req, res, next) => {
  try {
    const {label} = req.body;
    if (!label) {
      res.locals.instance = { message : 'Label required'};
      return next();
    } else {
      const labelQuery = `SELECT * FROM instance WHERE label = '${label}'`;
      const labelTaken = await db.query(labelQuery);
      // if table is not empty, then check if label is duplicated
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

module.exports = userController;
