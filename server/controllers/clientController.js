const userController = {};
const bcrypt = require('bcrypt');
const db = require('../db');
const salt = 10;
//how to create an apikey using a method given by node
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

userController.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    //console.log('in the signup');
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
    const { username, password } = req.body;
    const passwordQuery = `SELECT client_id, password FROM clients WHERE username = '${username}';`;
    const passwordResult = await db.query(passwordQuery);
    const clientID = passwordResult.rows[0].client_id;
    console.log('passwordResult', passwordResult.rows[0].password);

    const verified = await bcrypt.compare(password, passwordResult.rows[0].password);

    if (!verified) {
      res.locals.result = {verified: verified, message: "You do not have access, please try again"}
    } else {
      const jwtToken = jwt.sign({client_id: clientID}, process.env.TOKEN_SECRET);
      res.locals.result = {verified: verified, message: "login successfully"}
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.verify = async (req, res, next) => {

}


// userController.createInstance = async (req, res, next) => {
//   try {
//     const {label}
//     const token = crypto.randomUUID();
//     const hashedToken = await bcrypt.hash(token, salt)
//     const instanceQuery = 
//   }
//   catch {

//   }
// }

module.exports = userController;
