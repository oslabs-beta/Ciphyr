const userController = {};
const bcrypt = require('bcrypt');
const db = require('../db');
const salt = 10;
//how to create an apikey using a method given by node
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


userController.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    //console.log('in the signup');
    if (!username || !password || !email) {
      res.locals.newClient = { message: 'All input fields required'};
      return next();
    }
    let hashedPassword = await bcrypt.hash(password, salt);
    console.log('hash', hashedPassword)
    console.log('username', username);
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
      console.log('creating new client',create);
      res.locals.newClient = { message: 'Client created' };
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

// login would expect input from body, and then we should check if input is right username or email
userController.login = async (req, res, next) => {
  try {
    const { input, password } = req.body;
    const passwordQuery = `SELECT client_id, password FROM clients WHERE username = '${input}' OR email = '${input}';`;
    const passwordResult = await db.query(passwordQuery);
    const clientID = passwordResult.rows[0].client_id;
    // console.log('passwordResult', passwordResult.rows[0].password);

    const verified = await bcrypt.compare(password, passwordResult.rows[0].password);

    if (!verified) {
      res.locals.result = {verified: verified, message: "You do not have access, please try again"}
    } else {
      const jwtToken = jwt.sign({client_id: clientID}, process.env.TOKEN_SECRET);
      console.log('jwttoken', jwtToken);
      // res.cookie('token', jwtToken, { httpOnly: true, secure: true });
      res.locals.result = {verified: verified, message: "login successfully", jwt: jwtToken}
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.verifyToken = async (req, res, next) => {
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  // if (token == null) return res.sendStatus(401)
  // const token = req.cookies.token;
  
  const token = res.locals.result.jwt;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    // req.user = user
    res.locals.client = user;
    //console.log('token', token);
    console.log('res locals client', res.locals.client);
    return next();
  })
}

userController.createInstance = async (req, res, next) => {
  try {
    console.log('hello');
    const {label} = req.body;
    if (!label) {
      res.locals.instance = { message : 'Label required'};
      return next();
    } else {
      const labelQuery = `SELECT * FROM instance WHERE label = '${label}'`;
      const labelTaken = await db.query(labelQuery);
      console.log("LT", labelTaken)
      if (labelTaken.rowCount !== 0) {
        if (labelTaken.rows[0].label === label) {
          res.locals.instance = {message : 'Please use new label'};
          return next();
        }
      }
    } 
    console.log('after else statement');
    const id = res.locals.client.client_id;
    console.log('id', id);
    const apiKey = crypto.randomUUID();
    console.log('apikey', apiKey);
    //const hashedToken = await bcrypt.hash(token, salt)
    const instanceQuery = `INSERT INTO instance (label, api_key, client_id) VALUES ( '${label}', '${apiKey}','${id}')`;
    const newInstance = await db.query(instanceQuery);
    res.locals.instance = { message: 'New instance created'};
    return next();
  }
  
  catch(err) {
    return next(err)
  }
}

module.exports = userController;
